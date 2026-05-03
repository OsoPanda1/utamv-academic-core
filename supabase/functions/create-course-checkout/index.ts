import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type CheckoutRequest = {
  courseId?: string;
  courseSlug?: string;
  courseName?: string;
  priceMXN?: number;
  stripePriceId?: string;
  paymentPlan?: "full" | "installment_6" | "installment_12";
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "");

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const { data: { user } } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!user?.email) throw new Error("User not authenticated");

    const body = (await req.json()) as CheckoutRequest;
    const paymentPlan = body.paymentPlan ?? "full";

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
    const serviceClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

    const courseLookup = body.courseId
      ? await serviceClient.from("courses").select("id,slug,title,price_mxn,stripe_price_id,stripe_product_id").eq("id", body.courseId).maybeSingle()
      : await serviceClient.from("courses").select("id,slug,title,price_mxn,stripe_price_id,stripe_product_id").eq("slug", body.courseSlug ?? "").maybeSingle();

    const course = courseLookup.data;
    if (!course) throw new Error("Course not found");

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = customers.data.length > 0 ? customers.data[0].id : undefined;

    const successUrl = `${req.headers.get("origin")}/campus?enrolled=${course.slug}&success=true`;
    const cancelUrl = `${req.headers.get("origin")}/precios?canceled=true`;

    let session: Stripe.Checkout.Session;

    if (paymentPlan === "full") {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [{
          price: course.stripe_price_id ?? body.stripePriceId,
          quantity: 1,
        }],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: { user_id: user.id, course_id: course.id, payment_type: "full_payment" },
      });
    } else {
      const installments = paymentPlan === "installment_6" ? 6 : 12;
      const baseAmount = Math.round((course.price_mxn ?? body.priceMXN ?? 0) * 100);
      const monthlyAmount = Math.ceil(baseAmount / installments);

      session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        mode: "subscription",
        line_items: [{
          price_data: {
            currency: "mxn",
            product: course.stripe_product_id,
            recurring: { interval: "month", interval_count: 1 },
            unit_amount: monthlyAmount,
          },
          quantity: 1,
        }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        subscription_data: {
          metadata: {
            user_id: user.id,
            course_id: course.id,
            payment_type: "installment_plan",
            total_installments: String(installments),
          },
        },
      });
    }

    await serviceClient.from("course_purchases").upsert({
      user_id: user.id,
      course_id: course.id,
      purchase_type: paymentPlan === "full" ? "full_payment" : "installment_plan",
      total_amount: Math.round((course.price_mxn ?? body.priceMXN ?? 0) * 100),
      total_payments: paymentPlan === "full" ? null : paymentPlan === "installment_6" ? 6 : 12,
      stripe_payment_intent_id: session.payment_intent?.toString(),
      stripe_subscription_id: session.subscription?.toString(),
      status: "active",
    }, { onConflict: "user_id,course_id" });

    return new Response(JSON.stringify({ url: session.url }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});
