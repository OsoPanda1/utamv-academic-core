// Edge function: check-elevenlabs-permissions
// Verifica si la API key de ElevenLabs tiene el scope text_to_speech activo.
// Devuelve { ok, hasTextToSpeech, voiceCount, error? } sin consumir créditos de audio.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const ELEVEN_KEY = Deno.env.get("ELEVENLABS_API_KEY");
  if (!ELEVEN_KEY) {
    return new Response(
      JSON.stringify({ ok: false, hasTextToSpeech: false, error: "ELEVENLABS_API_KEY no configurada" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    // 1) /v1/user — confirma que la key es válida y muestra subscription
    const userRes = await fetch("https://api.elevenlabs.io/v1/user", {
      headers: { "xi-api-key": ELEVEN_KEY },
    });

    if (userRes.status === 401) {
      return new Response(
        JSON.stringify({ ok: false, hasTextToSpeech: false, error: "API key inválida o revocada" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2) Ping mínimo a TTS con texto de 1 carácter para detectar permisos sin consumir
    //    Usamos una voz pública (Sarah) y formato más barato.
    const probe = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL?output_format=mp3_22050_32",
      {
        method: "POST",
        headers: { "xi-api-key": ELEVEN_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ text: ".", model_id: "eleven_turbo_v2_5" }),
      },
    );

    if (probe.ok) {
      return new Response(
        JSON.stringify({ ok: true, hasTextToSpeech: true, provider: "elevenlabs" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await probe.text();
    let detail = body;
    try {
      const j = JSON.parse(body);
      detail = j?.detail?.message || j?.detail?.status || body;
    } catch { /* keep raw */ }

    return new Response(
      JSON.stringify({
        ok: false,
        hasTextToSpeech: false,
        status: probe.status,
        error: detail.slice(0, 300),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, hasTextToSpeech: false, error: (e as Error).message }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
