
CREATE TABLE IF NOT EXISTS public.tts_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','success','failed','fallback')),
  provider TEXT,
  audio_url TEXT,
  error_message TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tts_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view tts jobs"
  ON public.tts_jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins manage tts jobs"
  ON public.tts_jobs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_tts_jobs_updated_at
  BEFORE UPDATE ON public.tts_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_tts_jobs_lesson ON public.tts_jobs(lesson_id);
CREATE INDEX idx_tts_jobs_status ON public.tts_jobs(status);
