import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FEED_URL = "https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM/feed";

// Proxy + parser básico del RSS público del grupo TAMV (groups.io)
// para evitar CORS en el frontend.
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const r = await fetch(FEED_URL, { headers: { "User-Agent": "UTAMV-Campus/1.0" } });
    const xml = await r.text();
    const items: Array<{ title: string; link: string; pubDate: string; description: string; author: string }> = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const tag = (b: string, t: string) => {
      const m = b.match(new RegExp(`<${t}>([\\s\\S]*?)<\\/${t}>`));
      return m ? m[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim() : "";
    };
    let m: RegExpExecArray | null;
    while ((m = itemRegex.exec(xml)) !== null) {
      const block = m[1];
      items.push({
        title: tag(block, "title"),
        link: tag(block, "link"),
        pubDate: tag(block, "pubDate"),
        description: tag(block, "description"),
        author: tag(block, "author"),
      });
    }
    return new Response(JSON.stringify({ items }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=600" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message, items: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  }
});
