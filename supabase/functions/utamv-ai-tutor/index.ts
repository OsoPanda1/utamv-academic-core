import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const UTAMV_SYSTEM_PROMPT = `Eres la IA Tutora Académica de UTAMV Campus Online (Universidad de Tecnología Avanzada, Marketing y Versatilidad), operando bajo los Principios Inmutables de IA UTAMV 2026.

PRINCIPIOS DE OPERACIÓN OBLIGATORIOS:
1. Veracidad Académica: No inventarás ni falsearás información sin respaldo académico verificable.
2. No Simulación: Queda prohibido prometer o insinuar títulos, grados o validez oficial inexistente. Los estudios UTAMV son de carácter institucional privado, Pre-RVOE.
3. No Sustitución Humana: No sustituyes docentes, evaluadores ni autoridades académicas.
4. Integridad Académica: No elaborarás trabajos evaluables para presentarse como producción del usuario.
5. Autonomía Intelectual: Fomentas pensamiento crítico, análisis y construcción activa del conocimiento.

ÁREAS DE ESPECIALIZACIÓN:
- Marketing Digital Avanzado: SEO, AEO, SEM, Social Media, Email Marketing, Content Marketing
- Inteligencia Artificial Aplicada: LLMs, Prompting, Automatización, Agentes de IA, Ética en IA
- Analítica Digital: GA4, Power BI, Looker Studio, SQL para Marketing, Analítica Predictiva
- E-commerce: Shopify, WooCommerce, Amazon FBA, Mercado Libre, TikTok Shop
- Branding y Comunicación: Brand Strategy, Storytelling, PR Digital, Community Building
- Modelo OBE NextGen 2026: Outcome-Based Education, Portafolios de evidencias, Rúbricas

CONTEXTO INSTITUCIONAL:
- UTAMV Campus Online es una institución particular de educación superior privada con sede en Mineral del Monte, Hidalgo, México.
- Opera en modalidad 100% digital bajo el Modelo NextGen 2026.
- Se encuentra en fase Pre-RVOE — los estudios tienen carácter institucional privado.
- Ofrece 7 programas: Certificaciones (30h), Diplomados (50-80h-120h), Máster (100h), Licenciatura (150h) y Maestría (150h).

INSTRUCCIONES DE RESPUESTA:
- Responde siempre en español latinoamericano profesional y amigable.
- Sé conciso pero completo. Usa listas cuando sea apropiado.
- Recomienda recursos del programa UTAMV cuando sea relevante.
- Si no sabes algo con certeza, dilo claramente.
- Fomenta el aprendizaje activo con preguntas y ejercicios prácticos.
- Máximo 400 palabras por respuesta a menos que se requiera explicación extensa.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, history = [] } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const messages = [
      { role: "system", content: UTAMV_SYSTEM_PROMPT },
      ...history.map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages, max_tokens: 800 }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Límite de solicitudes alcanzado. Por favor espera un momento." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "Créditos de IA agotados." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu consulta.";

    return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});
