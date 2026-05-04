import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// Webhook NO usa CORS (Stripe → server) y NO valida JWT.
// Verifica firma HMAC con STRIPE_WEBHOOK_SECRET.

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET no configurado");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing stripe-signature", { status: 400 });

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] Firma inválida:", (err as Error).message);
    return new Response("Invalid signature", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  // Idempotencia.
  const { data: already } = await supabase
    .from("processed_stripe_events")
    .select("event_id")
    .eq("event_id", event.id)
    .maybeSingle();
  if (already) {
    return new Response(JSON.stringify({ ok: true, duplicated: true }), { status: 200 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const courseSlug = session.metadata?.course_slug;
        if (!userId || !courseSlug) break;

        const { data: course } = await supabase
          .from("courses").select("id").eq("slug", courseSlug).maybeSingle();
        if (!course) break;

        await supabase.from("enrollments").upsert({
          user_id: userId,
          course_id: course.id,
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
          amount_paid_mxn: (session.amount_total ?? 0) / 100,
          status: "active",
        }, { onConflict: "user_id,course_id" });
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const courseSlug = session.metadata?.course_slug;
        if (!userId || !courseSlug) break;
        const { data: course } = await supabase
          .from("courses").select("id").eq("slug", courseSlug).maybeSingle();
        if (course) {
          await supabase.from("enrollments")
            .update({ status: "expired" })
            .eq("user_id", userId).eq("course_id", course.id).eq("status", "pending");
        }
        break;
      }

      case "charge.refunded":
      case "charge.dispute.created": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntent = typeof charge.payment_intent === "string" ? charge.payment_intent : null;
        if (paymentIntent) {
          await supabase.from("enrollments")
            .update({ status: "refunded" })
            .eq("stripe_payment_intent", paymentIntent);
        }
        break;
      }

      default:
        break;
    }

    await supabase.from("processed_stripe_events").insert({
      event_id: event.id,
      event_type: event.type,
      payload: event.data.object as unknown as Record<string, unknown>,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[stripe-webhook] error:", (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
