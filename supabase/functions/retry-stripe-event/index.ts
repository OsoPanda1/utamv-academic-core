// Reintenta manualmente un evento de Stripe fallido (solo admins).
// Re-procesa el payload almacenado y registra el resultado en stripe_webhook_retry_audit.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

  // Verificar admin con anon + JWT del usuario
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  }
  const userId = userData.user.id;

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const { data: roleRow } = await admin
    .from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!roleRow) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders });
  }

  let body: { failure_id?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: corsHeaders });
  }

  if (!body.failure_id) {
    return new Response(JSON.stringify({ error: "failure_id required" }), { status: 400, headers: corsHeaders });
  }

  const { data: failure, error: fErr } = await admin
    .from("stripe_webhook_failures").select("*").eq("id", body.failure_id).maybeSingle();
  if (fErr || !failure) {
    return new Response(JSON.stringify({ error: "Failure not found" }), { status: 404, headers: corsHeaders });
  }

  let result: "success" | "failed" | "skipped" = "failed";
  let errorMessage: string | null = null;

  try {
    // Idempotencia: si ya fue procesado, marcar como skipped
    const { data: already } = await admin
      .from("processed_stripe_events").select("event_id").eq("event_id", failure.event_id).maybeSingle();

    if (already) {
      result = "skipped";
      errorMessage = "Evento ya procesado previamente (idempotencia)";
    } else {
      // Re-aplicar lógica del webhook según tipo
      const payload = failure.payload as Record<string, unknown>;
      const eventType = failure.event_type as string;

      if (eventType === "checkout.session.completed") {
        const session = payload as { metadata?: Record<string, string>; id?: string; payment_intent?: string; amount_total?: number };
        const userIdMeta = session.metadata?.user_id;
        const slug = session.metadata?.course_slug;
        if (userIdMeta && slug) {
          const { data: course } = await admin.from("courses").select("id").eq("slug", slug).maybeSingle();
          if (course) {
            await admin.from("enrollments").upsert({
              user_id: userIdMeta,
              course_id: course.id,
              stripe_session_id: session.id,
              stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
              amount_paid_mxn: (session.amount_total ?? 0) / 100,
              status: "active",
            }, { onConflict: "user_id,course_id" });
          }
        }
      }

      await admin.from("processed_stripe_events").insert({
        event_id: failure.event_id,
        event_type: eventType,
        payload,
      });
      result = "success";
    }

    await admin.from("stripe_webhook_failures")
      .update({ resolved: true, resolved_at: new Date().toISOString(), resolved_by: userId })
      .eq("id", failure.id);
  } catch (err) {
    errorMessage = (err as Error).message;
    result = "failed";
  }

  await admin.from("stripe_webhook_retry_audit").insert({
    failure_id: failure.id,
    event_id: failure.event_id,
    event_type: failure.event_type,
    retried_by: userId,
    result,
    error_message: errorMessage,
    notes: body.notes ?? null,
  });

  return new Response(JSON.stringify({ ok: true, result, error: errorMessage }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
