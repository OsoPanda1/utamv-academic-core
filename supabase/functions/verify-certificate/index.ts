import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    let certificateNumber: string | null = null;
    if (req.method === "GET") {
      const url = new URL(req.url);
      certificateNumber = url.searchParams.get("certificateNumber");
    } else {
      const body = await req.json().catch(() => ({}));
      certificateNumber = body.certificateNumber ?? null;
    }

    if (!certificateNumber) {
      return new Response(JSON.stringify({ valid: false, error: "certificateNumber requerido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: cert } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_number", certificateNumber)
      .maybeSingle();

    if (!cert) {
      return new Response(
        JSON.stringify({ valid: false, message: "Certificado no encontrado en BlockUTAMV." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const [{ data: profile }, { data: course }, { data: block }] = await Promise.all([
      supabase.from("profiles").select("full_name, display_name").eq("user_id", cert.user_id).maybeSingle(),
      supabase.from("courses").select("title, level, hours, category").eq("id", cert.course_id).maybeSingle(),
      supabase.from("block_utamv_chain").select("*").eq("certificate_id", cert.id).maybeSingle(),
    ]);

    return new Response(JSON.stringify({
      valid: true,
      certificate: {
        number: cert.certificate_number,
        holderName: profile?.full_name || profile?.display_name || "Estudiante UTAMV",
        courseName: course?.title,
        courseLevel: course?.level,
        category: course?.category,
        hours: cert.hours_completed || course?.hours,
        issuedAt: cert.issued_at,
        finalScore: cert.final_score,
        blockchainHash: cert.blockchain_hash,
        pdfUrl: cert.pdf_url,
        institution: "Universidad de Tecnología Avanzada, Marketing y Versatilidad (UTAMV) — Campus Online",
        note: "Estudios de carácter particular. Pre-RVOE. Certificado institucional con verificación BlockUTAMV.",
      },
      block: block ? {
        index: block.block_index,
        hash: block.block_hash,
        previousHash: block.previous_hash,
        dataHash: block.data_hash,
        nonce: block.nonce,
        createdAt: block.created_at,
      } : null,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
