import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
    const { certificateNumber } = await req.json();

    const { data: cert } = await supabase
      .from('certificates')
      .select('*, profiles(full_name, display_name), courses(title, level, hours)')
      .eq('certificate_number', certificateNumber)
      .single();

    if (!cert) {
      return new Response(JSON.stringify({ valid: false, message: 'Certificado no encontrado.' }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404
      });
    }

    return new Response(JSON.stringify({
      valid: true,
      certificate: {
        number: cert.certificate_number,
        holderName: cert.profiles?.full_name || cert.profiles?.display_name || 'Estudiante UTAMV',
        courseName: cert.courses?.title,
        courseLevel: cert.courses?.level,
        hours: cert.hours_completed || cert.courses?.hours,
        issuedAt: cert.issued_at,
        finalScore: cert.final_score,
        blockchainHash: cert.blockchain_hash,
        institution: 'Universidad de Tecnología Avanzada, Marketing y Versatilidad (UTAMV)',
        note: 'Estudios sin reconocimiento de validez oficial. Certificado institucional privado.',
      }
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500
    });
  }
});
