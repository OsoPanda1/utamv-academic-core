import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "");

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const { data: { user } } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!user?.email) throw new Error("User not authenticated");

    const { courseSlug, courseName, priceMXN, priceUSD, stripePriceId } = await req.json();

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId = customers.data.length > 0 ? customers.data[0].id : undefined;

    // Create a dynamic price if no stripe price ID available
    const lineItems = stripePriceId && stripePriceId !== `price_${courseSlug}` ? [{ price: stripePriceId, quantity: 1 }] : [{
      price_data: {
        currency: 'mxn',
        product_data: { name: courseName, description: `UTAMV Elite Masterclass — ${courseName}` },
        unit_amount: Math.round(priceMXN * 100),
      },
      quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/campus?enrolled=${courseSlug}&success=true`,
      cancel_url: `${req.headers.get("origin")}/precios?canceled=true`,
      metadata: { user_id: user.id, course_slug: courseSlug, user_email: user.email },
      payment_intent_data: { metadata: { user_id: user.id, course_slug: courseSlug } },
    });

    // After successful payment (optimistic enrollment for demo)
    const serviceClient = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
    const { data: course } = await serviceClient.from('courses').select('id').eq('slug', courseSlug).single();
    if (course) {
      await serviceClient.from('enrollments').upsert({
        user_id: user.id,
        course_id: course.id,
        stripe_session_id: session.id,
        amount_paid_mxn: priceMXN,
        status: 'active',
      }, { onConflict: 'user_id,course_id' });
    }

    return new Response(JSON.stringify({ url: session.url }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});
