BEGIN;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS subscription_tier TEXT CHECK (subscription_tier IN ('basic', 'pro', 'none')) DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS subscription_status TEXT,
  ADD COLUMN IF NOT EXISTS subscription_valid_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

CREATE TABLE IF NOT EXISTS public.course_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('full_payment', 'installment_plan')),
  total_amount INTEGER NOT NULL,
  amount_paid INTEGER NOT NULL DEFAULT 0,
  payments_completed INTEGER NOT NULL DEFAULT 0,
  total_payments INTEGER,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'suspended', 'defaulted')) DEFAULT 'active',
  payment_schedule JSONB,
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  access_revoked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own purchases" ON public.course_purchases;
CREATE POLICY "Users can view own purchases"
ON public.course_purchases
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role manage purchases" ON public.course_purchases;
CREATE POLICY "Service role manage purchases"
ON public.course_purchases
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.touch_course_purchases_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_touch_course_purchases_updated_at ON public.course_purchases;
CREATE TRIGGER trg_touch_course_purchases_updated_at
BEFORE UPDATE ON public.course_purchases
FOR EACH ROW
EXECUTE FUNCTION public.touch_course_purchases_updated_at();

COMMIT;
