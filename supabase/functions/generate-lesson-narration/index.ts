// Edge function: generate-lesson-narration
// Genera audio narrado real con ElevenLabs (voz Sarah) para una lección
// y lo sube al bucket lessons-media, actualizando lessons.audio_url.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SARAH_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ELEVEN_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!ELEVEN_KEY) {
      return new Response(JSON.stringify({ error: "ELEVENLABS_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const body = await req.json().catch(() => ({}));
    const { lessonId, batchAll = false, courseSlug } = body as {
      lessonId?: string; batchAll?: boolean; courseSlug?: string;
    };

    // Resolver lecciones a procesar
    let lessons: Array<{ id: string; title: string; transcript: string | null; audio_url: string | null }> = [];
    if (batchAll) {
      const { data: course } = await admin.from("courses").select("id")
        .eq("slug", courseSlug ?? "diplomado-ecosistemas-digitales").maybeSingle();
      if (!course) throw new Error("Curso no encontrado");
      const { data, error } = await admin.from("lessons")
        .select("id,title,transcript,audio_url").eq("course_id", course.id).order("order_index");
      if (error) throw error;
      lessons = data ?? [];
    } else if (lessonId) {
      const { data, error } = await admin.from("lessons")
        .select("id,title,transcript,audio_url").eq("id", lessonId).maybeSingle();
      if (error) throw error;
      if (data) lessons = [data];
    } else {
      throw new Error("Provide lessonId or batchAll=true");
    }

    const results: Array<{ lessonId: string; audio_url?: string; status: string; error?: string }> = [];

    for (const lesson of lessons) {
      try {
        // Saltar si ya tiene audio
        if (lesson.audio_url && lesson.audio_url.includes("lessons-media")) {
          results.push({ lessonId: lesson.id, audio_url: lesson.audio_url, status: "skipped_existing" });
          continue;
        }

        const text = (lesson.transcript || lesson.title || "Lección UTAMV.").slice(0, 2500);

        // ElevenLabs TTS
        const ttsRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${SARAH_VOICE_ID}?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: {
              "xi-api-key": ELEVEN_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              model_id: "eleven_multilingual_v2",
              voice_settings: { stability: 0.55, similarity_boost: 0.78, style: 0.25, use_speaker_boost: true },
            }),
          },
        );
        if (!ttsRes.ok) {
          const err = await ttsRes.text();
          results.push({ lessonId: lesson.id, status: "tts_failed", error: err.slice(0, 200) });
          continue;
        }
        const audioBuffer = new Uint8Array(await ttsRes.arrayBuffer());

        // Subir al bucket
        const path = `audio/lesson-${lesson.id}.mp3`;
        const { error: upErr } = await admin.storage.from("lessons-media").upload(path, audioBuffer, {
          contentType: "audio/mpeg", upsert: true,
        });
        if (upErr) {
          results.push({ lessonId: lesson.id, status: "upload_failed", error: upErr.message });
          continue;
        }
        const { data: pub } = admin.storage.from("lessons-media").getPublicUrl(path);
        const audio_url = pub.publicUrl;

        // Actualizar lección
        await admin.from("lessons").update({ audio_url }).eq("id", lesson.id);
        results.push({ lessonId: lesson.id, audio_url, status: "ok" });
      } catch (e) {
        results.push({ lessonId: lesson.id, status: "error", error: (e as Error).message });
      }
    }

    return new Response(
      JSON.stringify({ ok: true, processed: results.length, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
