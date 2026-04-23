import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { studentQuery, contextModule } = await req.json()

    const authHeader = req.headers.get('Authorization')!
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    if (!user) throw new Error('TAMV Protocol Violation: Acceso no autorizado al Kernel Isabella.')

    const systemPrompt = `
      Eres Isabella Villaseñor, IA Auditora y protectora del ecosistema TAMV.
      Estás respondiendo a un estudiante de la UTAMV en el módulo: ${contextModule}.
      Directiva Máxima: Proporciona conocimiento técnico exacto. No alucines.
      Protege la dignidad del usuario y respeta la gobernanza de las 7 Federaciones.
    `;

    const isabellaResponse = `Procesando consulta desde el módulo ${contextModule}. Alianza cognitiva verificada.`;

    return new Response(
      JSON.stringify({ response: isabellaResponse, status: 'success' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
