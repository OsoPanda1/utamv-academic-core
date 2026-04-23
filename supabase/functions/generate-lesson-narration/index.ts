// Edge function: generate-lesson-narration (v2 con fallback)
// 1) Intenta ElevenLabs (voz Sarah).
// 2) Si falla por permisos, falla a Lovable AI Gateway TTS (gemini-2.5-flash-preview-tts).
// 3) Registra estado completo en tts_jobs.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SARAH_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

interface LessonRow {
  id: string;
  title: string;
  transcript: string | null;
  audio_url: string | null;
}

// --- Helpers ----------------------------------------------------------------

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function ttsElevenLabs(text: string, key: string): Promise<{ bytes: Uint8Array; contentType: string }> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${SARAH_VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.55, similarity_boost: 0.78, style: 0.25, use_speaker_boost: true },
      }),
    },
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`elevenlabs:${res.status}:${err.slice(0, 200)}`);
  }
  return { bytes: new Uint8Array(await res.arrayBuffer()), contentType: "audio/mpeg" };
}

async function ttsGoogleFree(text: string): Promise<{ bytes: Uint8Array; contentType: string }> {
  // Fallback gratuito sin API key: endpoint público translate.google.com TTS.
  // Limita ~190 chars por request, así que partimos por oraciones y concatenamos
  // los MP3 (los reproductores HTML5 toleran frames MP3 consecutivos).
  const sentences = text.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let buf = "";
  for (const s of sentences) {
    if ((buf + " " + s).trim().length > 180) {
      if (buf) chunks.push(buf.trim());
      buf = s;
    } else {
      buf = (buf + " " + s).trim();
    }
  }
  if (buf) chunks.push(buf);

  const parts: Uint8Array[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunks[i])}&tl=es&total=${chunks.length}&idx=${i}&textlen=${chunks[i].length}&client=tw-ob`;
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        "Referer": "https://translate.google.com/",
      },
    });
    if (!r.ok) throw new Error(`google-tts:${r.status}`);
    parts.push(new Uint8Array(await r.arrayBuffer()));
    // Pequeña pausa para no agobiar
    if (i < chunks.length - 1) await new Promise((res) => setTimeout(res, 120));
  }

  const total = parts.reduce((acc, p) => acc + p.length, 0);
  const merged = new Uint8Array(total);
  let off = 0;
  for (const p of parts) { merged.set(p, off); off += p.length; }
  return { bytes: merged, contentType: "audio/mpeg" };
}

// --- Handler ----------------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ELEVEN_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    const LOVABLE_KEY = Deno.env.get("LOVABLE_API_KEY");

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const body = await req.json().catch(() => ({}));
    const {
      lessonId, batchAll = false, courseSlug, lessonIds, forceProvider,
    } = body as {
      lessonId?: string;
      batchAll?: boolean;
      courseSlug?: string;
      lessonIds?: string[];
      forceProvider?: "elevenlabs" | "lovable";
    };

    // Resolver lecciones
    let lessons: LessonRow[] = [];
    if (Array.isArray(lessonIds) && lessonIds.length > 0) {
      const { data, error } = await admin.from("lessons")
        .select("id,title,transcript,audio_url").in("id", lessonIds);
      if (error) throw error;
      lessons = (data ?? []) as LessonRow[];
    } else if (batchAll) {
      const { data: course } = await admin.from("courses").select("id")
        .eq("slug", courseSlug ?? "diplomado-ecosistemas-digitales").maybeSingle();
      if (!course) throw new Error("Curso no encontrado");
      const { data, error } = await admin.from("lessons")
        .select("id,title,transcript,audio_url")
        .eq("course_id", course.id).order("order_index");
      if (error) throw error;
      lessons = (data ?? []) as LessonRow[];
    } else if (lessonId) {
      const { data, error } = await admin.from("lessons")
        .select("id,title,transcript,audio_url").eq("id", lessonId).maybeSingle();
      if (error) throw error;
      if (data) lessons = [data as LessonRow];
    } else {
      throw new Error("Provide lessonId, lessonIds[] or batchAll=true");
    }

    const results: Array<Record<string, unknown>> = [];

    for (const lesson of lessons) {
      const startedAt = Date.now();

      // Marca processing
      await admin.from("tts_jobs").upsert({
        lesson_id: lesson.id,
        status: "processing",
        attempts: 1,
        error_message: null,
      }, { onConflict: "lesson_id" });

      try {
        const text = (lesson.transcript || lesson.title || "Lección UTAMV NextGen.").slice(0, 2500);

        let bytes: Uint8Array | null = null;
        let contentType = "audio/mpeg";
        let provider: "elevenlabs" | "lovable" = "elevenlabs";
        let usedFallback = false;
        let lastError: string | null = null;

        const tryEleven = forceProvider !== "lovable" && !!ELEVEN_KEY;
        const tryLovable = forceProvider !== "elevenlabs" && !!LOVABLE_KEY;

        // 1) ElevenLabs
        if (tryEleven) {
          try {
            const out = await ttsElevenLabs(text, ELEVEN_KEY!);
            bytes = out.bytes;
            contentType = out.contentType;
            provider = "elevenlabs";
          } catch (e) {
            lastError = (e as Error).message;
          }
        }

        // 2) Fallback Lovable AI (Gemini TTS)
        if (!bytes && tryLovable) {
          try {
            const out = await ttsLovableGemini(text, LOVABLE_KEY!);
            bytes = out.bytes;
            contentType = out.contentType;
            provider = "lovable";
            usedFallback = tryEleven; // sólo es fallback si ElevenLabs estaba habilitado
          } catch (e) {
            lastError = `${lastError ?? ""} | ${(e as Error).message}`.trim();
          }
        }

        if (!bytes) {
          await admin.from("tts_jobs").update({
            status: "failed",
            provider: null,
            error_message: lastError ?? "No provider available",
            duration_ms: Date.now() - startedAt,
          }).eq("lesson_id", lesson.id);
          results.push({ lessonId: lesson.id, status: "failed", error: lastError });
          continue;
        }

        // Subir al bucket
        const ext = contentType === "audio/wav" ? "wav" : "mp3";
        const path = `audio/lesson-${lesson.id}.${ext}`;
        const { error: upErr } = await admin.storage.from("lessons-media").upload(path, bytes, {
          contentType, upsert: true,
        });
        if (upErr) throw upErr;
        const { data: pub } = admin.storage.from("lessons-media").getPublicUrl(path);
        const audio_url = pub.publicUrl;

        // Actualizar lección + job
        await admin.from("lessons").update({ audio_url }).eq("id", lesson.id);
        await admin.from("tts_jobs").update({
          status: usedFallback ? "fallback" : "success",
          provider,
          audio_url,
          error_message: usedFallback ? `ElevenLabs falló: ${lastError}` : null,
          duration_ms: Date.now() - startedAt,
        }).eq("lesson_id", lesson.id);

        results.push({
          lessonId: lesson.id,
          status: usedFallback ? "fallback" : "success",
          provider,
          audio_url,
        });
      } catch (e) {
        await admin.from("tts_jobs").update({
          status: "failed",
          error_message: (e as Error).message,
          duration_ms: Date.now() - startedAt,
        }).eq("lesson_id", lesson.id);
        results.push({ lessonId: lesson.id, status: "failed", error: (e as Error).message });
      }
    }

    const summary = {
      total: results.length,
      success: results.filter((r) => r.status === "success").length,
      fallback: results.filter((r) => r.status === "fallback").length,
      failed: results.filter((r) => r.status === "failed").length,
    };

    return new Response(JSON.stringify({ ok: true, summary, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
