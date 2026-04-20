
-- tamvcrums_logs
CREATE TABLE public.tamvcrums_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ecg_rhythm INTEGER,
  impact_score INTEGER,
  emotional_state JSONB DEFAULT '{}'::jsonb,
  federation_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tamvcrums_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tamvcrums_logs"
  ON public.tamvcrums_logs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can insert tamvcrums_logs"
  ON public.tamvcrums_logs FOR INSERT TO authenticated
  WITH CHECK (true);

-- tamv_federation_ring
CREATE TABLE public.tamv_federation_ring (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  node_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'OK',
  ecg_rhythm INTEGER DEFAULT 40,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tamv_federation_ring ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tamv_federation_ring"
  ON public.tamv_federation_ring FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Federation ring publicly readable"
  ON public.tamv_federation_ring FOR SELECT
  USING (true);

CREATE TRIGGER update_tamv_federation_ring_updated_at
  BEFORE UPDATE ON public.tamv_federation_ring
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- tamv_kernel_events
CREATE TABLE public.tamv_kernel_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tamv_kernel_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tamv_kernel_events"
  ON public.tamv_kernel_events FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can insert kernel events"
  ON public.tamv_kernel_events FOR INSERT TO authenticated
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_tamvcrums_logs_created ON public.tamvcrums_logs(created_at DESC);
CREATE INDEX idx_tamv_kernel_events_type ON public.tamv_kernel_events(type);
CREATE INDEX idx_tamv_kernel_events_created ON public.tamv_kernel_events(created_at DESC);
