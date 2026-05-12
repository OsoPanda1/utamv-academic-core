-- Auditoría de reintentos de webhooks Stripe
CREATE TABLE public.stripe_webhook_retry_audit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  failure_id UUID REFERENCES public.stripe_webhook_failures(id) ON DELETE SET NULL,
  event_id TEXT,
  event_type TEXT,
  retried_by UUID NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('success', 'failed', 'skipped')),
  error_message TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_retry_audit_event ON public.stripe_webhook_retry_audit(event_id);
CREATE INDEX idx_retry_audit_created ON public.stripe_webhook_retry_audit(created_at DESC);

ALTER TABLE public.stripe_webhook_retry_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view retry audit"
  ON public.stripe_webhook_retry_audit FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins insert retry audit"
  ON public.stripe_webhook_retry_audit FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND retried_by = auth.uid());