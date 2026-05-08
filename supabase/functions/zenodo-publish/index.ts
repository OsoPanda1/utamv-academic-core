import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Publica/registra un depósito en Zenodo a partir de un certificado o
// recurso académico generado por UTAMV. Uso: solo admins.
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const ZENODO_TOKEN = Deno.env.get("ZENODO_TOKEN");
    if (!ZENODO_TOKEN) throw new Error("ZENODO_TOKEN missing");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const { data: ud } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    const user = ud.user;
    if (!user) throw new Error("Not authenticated");

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", user.id);
    if (!roles?.some((r) => r.role === "admin")) throw new Error("Forbidden: admin only");

    const body = await req.json() as {
      title: string; description: string; creators?: { name: string; orcid?: string }[];
      keywords?: string[]; upload_type?: string; communities?: string[];
    };
    if (!body.title || !body.description) throw new Error("title and description required");

    const ZENODO_API = "https://zenodo.org/api/deposit/depositions";
    const create = await fetch(`${ZENODO_API}?access_token=${ZENODO_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metadata: {
          title: body.title,
          upload_type: body.upload_type ?? "publication",
          publication_type: "report",
          description: body.description,
          creators: body.creators ?? [{ name: "Castillo Trejo, Edwin Oswaldo", orcid: "0009-0008-5050-1539" }],
          keywords: body.keywords ?? ["UTAMV", "TAMV", "Soberanía Tecnológica"],
          communities: (body.communities ?? []).map((id) => ({ identifier: id })),
        },
      }),
    });
    const json = await create.json();
    if (!create.ok) throw new Error(`Zenodo error: ${JSON.stringify(json)}`);

    return new Response(JSON.stringify({ ok: true, deposition: json }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500,
    });
  }
});
