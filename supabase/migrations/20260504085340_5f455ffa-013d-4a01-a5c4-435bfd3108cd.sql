
-- 1) Marcadores estables de portada por slug (la imagen real se resuelve en frontend).
UPDATE public.courses SET thumbnail_url = 'asset:' || slug WHERE thumbnail_url IS NULL OR thumbnail_url = '';

-- 2) Idempotencia para webhook de Stripe.
CREATE TABLE IF NOT EXISTS public.processed_stripe_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  payload JSONB
);

ALTER TABLE public.processed_stripe_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view stripe events"
  ON public.processed_stripe_events
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
