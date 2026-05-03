import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function extractStoragePath(url: string): { bucket: string; path: string } | null {
  const marker = "/storage/v1/object/public/";
  const index = url.indexOf(marker);
  if (index < 0) return null;
  const suffix = url.slice(index + marker.length);
  const [bucket, ...rest] = suffix.split("/");
  const path = rest.join("/");
  if (!bucket || !path) return null;
  return { bucket, path: decodeURIComponent(path) };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const token = authHeader.replace("Bearer ", "");
  const anon = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", { global: { headers: { Authorization: authHeader } } });
  const admin = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

  const { data: auth } = await anon.auth.getUser(token);
  if (!auth?.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const { url, expiresIn = 120 } = await req.json();
  if (!url) return new Response(JSON.stringify({ error: "url requerida" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const parsed = extractStoragePath(url);
  if (!parsed) return new Response(JSON.stringify({ url }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const signed = await admin.storage.from(parsed.bucket).createSignedUrl(parsed.path, expiresIn);
  if (signed.error) return new Response(JSON.stringify({ error: signed.error.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  return new Response(JSON.stringify({ url: signed.data.signedUrl }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
