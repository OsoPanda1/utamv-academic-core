-- =====================================================
-- UTAMV-RIS: Reglamento de Integridad y Soberanía
-- Gobernanza ética funcional con trazabilidad inmutable
-- =====================================================

-- 1) Catálogos
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'governance_alert_level') THEN
    CREATE TYPE public.governance_alert_level AS ENUM ('level_i', 'level_ii', 'level_iii', 'level_iv');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'governance_case_status') THEN
    CREATE TYPE public.governance_case_status AS ENUM ('open', 'under_review', 'resolved', 'dismissed');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'governance_resolution_type') THEN
    CREATE TYPE public.governance_resolution_type AS ENUM (
      'auto_guidance',
      'mentorship',
      'credit_deduction_10',
      'temporary_isabella_suspension',
      'excellence_penalty',
      'expulsion',
      'report_annulled',
      'architect_veto',
      'pending'
    );
  END IF;
END $$;

-- 2) Matriz de protocolos (SAS)
CREATE TABLE IF NOT EXISTS public.governance_protocols (
  id BIGSERIAL PRIMARY KEY,
  level governance_alert_level NOT NULL UNIQUE,
  protocol_name TEXT NOT NULL,
  default_action TEXT NOT NULL,
  resolution_options JSONB NOT NULL DEFAULT '[]'::jsonb,
  blocks_current_module BOOLEAN NOT NULL DEFAULT false,
  report_to_sovereign_id BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.governance_protocols (
  level,
  protocol_name,
  default_action,
  resolution_options,
  blocks_current_module,
  report_to_sovereign_id
)
VALUES
  ('level_i', 'Incidencia formativa', 'Emitir guía de Ingeniería de Co-creación', '["auto_guidance"]'::jsonb, false, false),
  ('level_ii', 'Intento de delegación', 'Bloquear módulo y notificar monitor docente', '["mentorship", "credit_deduction_10"]'::jsonb, true, true),
  ('level_iii', 'Conflicto ético y reincidencia', 'Escalar al Consejo de Soberanía y suspender acceso a Isabella', '["temporary_isabella_suspension", "excellence_penalty"]'::jsonb, true, true),
  ('level_iv', 'Fraude sistémico o violación institucional', 'Suspensión total inmediata y evaluación de expulsión', '["expulsion", "architect_veto"]'::jsonb, true, true)
ON CONFLICT (level) DO UPDATE
SET
  protocol_name = EXCLUDED.protocol_name,
  default_action = EXCLUDED.default_action,
  resolution_options = EXCLUDED.resolution_options,
  blocks_current_module = EXCLUDED.blocks_current_module,
  report_to_sovereign_id = EXCLUDED.report_to_sovereign_id;

-- 3) Biblioteca de aprendizaje de Isabella
CREATE TABLE IF NOT EXISTS public.isabella_learning_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.isabella_learning_library (slug, title, content_markdown, tags)
VALUES (
  'ingenieria-co-creacion',
  'Ingeniería de Co-creación',
  'Guía institucional para transformar prompts en evidencia académica citada, verificable y reflexiva.',
  '["etica", "cocreatividad", "citacion", "transparencia"]'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  content_markdown = EXCLUDED.content_markdown,
  tags = EXCLUDED.tags,
  is_active = true;

-- 4) Núcleo de gobernanza
CREATE TABLE IF NOT EXISTS public.governance_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opened_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  level governance_alert_level NOT NULL,
  status governance_case_status NOT NULL DEFAULT 'open',
  source TEXT NOT NULL DEFAULT 'isabella_kernel',
  summary TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  appeal_deadline TIMESTAMPTZ,
  requires_architect_veto BOOLEAN NOT NULL DEFAULT false,
  resolution governance_resolution_type NOT NULL DEFAULT 'pending',
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.governance_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.governance_cases(id) ON DELETE SET NULL,
  subject_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  detected_by TEXT NOT NULL DEFAULT 'isabella_kernel',
  ai_session_id UUID REFERENCES public.ai_sessions(id) ON DELETE SET NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  level governance_alert_level NOT NULL,
  alert_code TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.governance_case_events (
  id BIGSERIAL PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES public.governance_cases(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role TEXT,
  event_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.governance_appeals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL UNIQUE REFERENCES public.governance_cases(id) ON DELETE CASCADE,
  appellant_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  statement TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  status governance_case_status NOT NULL DEFAULT 'under_review',
  resolution governance_resolution_type NOT NULL DEFAULT 'pending',
  resolved_at TIMESTAMPTZ
);

-- 5) Libros inmutables
CREATE TABLE IF NOT EXISTS public.governance_blue_book (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_id UUID REFERENCES public.governance_cases(id) ON DELETE SET NULL,
  entry_type TEXT NOT NULL,
  notes TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.governance_silver_book (
  id BIGSERIAL PRIMARY KEY,
  teacher_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_id UUID REFERENCES public.governance_cases(id) ON DELETE SET NULL,
  entry_type TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0 CHECK (points >= 0),
  notes TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.governance_platinum_book (
  id BIGSERIAL PRIMARY KEY,
  architect_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  case_id UUID REFERENCES public.governance_cases(id) ON DELETE SET NULL,
  manifesto TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6) Seguimiento docente (puntos negativos)
CREATE TABLE IF NOT EXISTS public.governance_teacher_points (
  id BIGSERIAL PRIMARY KEY,
  teacher_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_id UUID REFERENCES public.governance_cases(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 1 CHECK (points > 0),
  cycle_label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.governance_teaching_restrictions (
  id BIGSERIAL PRIMARY KEY,
  teacher_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cycle_label TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (teacher_user_id, cycle_label)
);

CREATE TABLE IF NOT EXISTS public.governance_architect_vetoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL UNIQUE REFERENCES public.governance_cases(id) ON DELETE CASCADE,
  architect_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  manifesto TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7) Índices
CREATE INDEX IF NOT EXISTS idx_gov_alerts_subject_level ON public.governance_alerts(subject_user_id, level, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gov_cases_subject_status ON public.governance_cases(subject_user_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gov_case_events_case ON public.governance_case_events(case_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gov_blue_user ON public.governance_blue_book(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gov_silver_teacher ON public.governance_silver_book(teacher_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gov_points_cycle_teacher ON public.governance_teacher_points(cycle_label, teacher_user_id);

-- 8) Utilidades y triggers
CREATE OR REPLACE FUNCTION public.governance_next_cycle_label(ref_ts timestamptz DEFAULT now())
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  current_year INT := EXTRACT(YEAR FROM ref_ts)::INT;
  current_quarter INT := EXTRACT(QUARTER FROM ref_ts)::INT;
BEGIN
  IF current_quarter = 4 THEN
    RETURN (current_year + 1)::TEXT || '-Q1';
  END IF;
  RETURN current_year::TEXT || '-Q' || (current_quarter + 1)::TEXT;
END;
$$;

CREATE OR REPLACE FUNCTION public.governance_cycle_label(ref_ts timestamptz DEFAULT now())
RETURNS TEXT
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT EXTRACT(YEAR FROM ref_ts)::INT::TEXT || '-Q' || EXTRACT(QUARTER FROM ref_ts)::INT::TEXT;
$$;

CREATE OR REPLACE FUNCTION public.prevent_immutable_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RAISE EXCEPTION 'Tabla inmutable: operación % no permitida en %', TG_OP, TG_TABLE_NAME;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_governance_case_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_isabella_library_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_governance_alert_before_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  level_ii_count INT;
  opened_case_id UUID;
BEGIN
  -- Escalamiento automático por reincidencia: 3 alertas nivel II -> nivel III
  IF NEW.level = 'level_ii' THEN
    SELECT COUNT(*) INTO level_ii_count
    FROM public.governance_alerts ga
    WHERE ga.subject_user_id = NEW.subject_user_id
      AND ga.level = 'level_ii'
      AND ga.created_at >= now() - interval '180 days';

    IF level_ii_count >= 2 THEN
      NEW.level := 'level_iii';
      NEW.alert_code := 'auto_reincidence_escalation';
      NEW.details := NEW.details || jsonb_build_object('escalated_by', 'reincidence_rule', 'window_days', 180);
    END IF;
  END IF;

  -- Nivel I: guía formativa sin reporte soberano
  IF NEW.level = 'level_i' THEN
    NEW.case_id := NULL;
    RETURN NEW;
  END IF;

  INSERT INTO public.governance_cases (
    subject_user_id,
    opened_by_user_id,
    level,
    status,
    source,
    summary,
    evidence,
    appeal_deadline,
    requires_architect_veto,
    resolution
  )
  VALUES (
    NEW.subject_user_id,
    auth.uid(),
    NEW.level,
    'open',
    COALESCE(NEW.detected_by, 'isabella_kernel'),
    'Caso automático generado por SAS (' || NEW.level::TEXT || ')',
    NEW.details,
    now() + interval '24 hours',
    (NEW.level = 'level_iv'),
    'pending'
  )
  RETURNING id INTO opened_case_id;

  NEW.case_id := opened_case_id;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_governance_alert_after_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  guidance_id UUID;
BEGIN
  IF NEW.level = 'level_i' THEN
    SELECT id INTO guidance_id
    FROM public.isabella_learning_library
    WHERE slug = 'ingenieria-co-creacion' AND is_active = true
    LIMIT 1;

    INSERT INTO public.governance_blue_book (user_id, case_id, entry_type, notes, payload)
    VALUES (
      NEW.subject_user_id,
      NULL,
      'formative_guidance',
      'Asistencia automática: Ingeniería de Co-creación.',
      jsonb_build_object('guidance_id', guidance_id, 'alert_id', NEW.id)
    );

    RETURN NEW;
  END IF;

  INSERT INTO public.governance_case_events (case_id, event_type, actor_user_id, actor_role, event_payload)
  VALUES (
    NEW.case_id,
    'alert_raised',
    auth.uid(),
    'isabella_kernel',
    jsonb_build_object('alert_id', NEW.id, 'level', NEW.level, 'alert_code', NEW.alert_code)
  );

  INSERT INTO public.governance_blue_book (user_id, case_id, entry_type, notes, payload)
  VALUES (
    NEW.subject_user_id,
    NEW.case_id,
    'warning',
    'Registro de alerta en expediente ético.',
    jsonb_build_object('alert_id', NEW.id, 'level', NEW.level, 'details', NEW.details)
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_teacher_points_after_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_points INT;
  next_cycle TEXT;
BEGIN
  INSERT INTO public.governance_silver_book (teacher_user_id, case_id, entry_type, points, notes, payload)
  VALUES (
    NEW.teacher_user_id,
    NEW.case_id,
    'negative_point',
    NEW.points,
    NEW.reason,
    jsonb_build_object('teacher_point_id', NEW.id, 'cycle_label', NEW.cycle_label)
  );

  SELECT COALESCE(SUM(points), 0) INTO total_points
  FROM public.governance_teacher_points
  WHERE teacher_user_id = NEW.teacher_user_id
    AND cycle_label = NEW.cycle_label;

  IF total_points >= 3 THEN
    next_cycle := public.governance_next_cycle_label(now());

    INSERT INTO public.governance_teaching_restrictions (teacher_user_id, cycle_label, reason)
    VALUES (NEW.teacher_user_id, next_cycle, 'Acumulación de 3 o más puntos negativos en ciclo vigente')
    ON CONFLICT (teacher_user_id, cycle_label) DO NOTHING;

    INSERT INTO public.governance_silver_book (teacher_user_id, case_id, entry_type, points, notes, payload)
    VALUES (
      NEW.teacher_user_id,
      NEW.case_id,
      'teaching_inhabilitated_next_cycle',
      0,
      'Docente inhabilitado para impartir cátedra en el siguiente ciclo.',
      jsonb_build_object('trigger_cycle', NEW.cycle_label, 'restricted_cycle', next_cycle)
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_architect_veto_after_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.governance_cases
  SET
    requires_architect_veto = false,
    status = 'resolved',
    resolution = 'architect_veto',
    resolved_at = now()
  WHERE id = NEW.case_id;

  INSERT INTO public.governance_case_events (case_id, event_type, actor_user_id, actor_role, event_payload)
  VALUES (
    NEW.case_id,
    'architect_veto_applied',
    NEW.architect_user_id,
    'architect',
    jsonb_build_object('manifesto', NEW.manifesto, 'evidence', NEW.evidence)
  );

  INSERT INTO public.governance_platinum_book (architect_user_id, case_id, manifesto, payload)
  VALUES (
    NEW.architect_user_id,
    NEW.case_id,
    NEW.manifesto,
    jsonb_build_object('evidence', NEW.evidence)
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_governance_cases_updated_at
  BEFORE UPDATE ON public.governance_cases
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_governance_case_updated_at();

CREATE TRIGGER trg_isabella_library_updated_at
  BEFORE UPDATE ON public.isabella_learning_library
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_isabella_library_updated_at();

CREATE TRIGGER trg_governance_alert_before_insert
  BEFORE INSERT ON public.governance_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_governance_alert_before_insert();

CREATE TRIGGER trg_governance_alert_after_insert
  AFTER INSERT ON public.governance_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_governance_alert_after_insert();

CREATE TRIGGER trg_teacher_points_after_insert
  AFTER INSERT ON public.governance_teacher_points
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_teacher_points_after_insert();

CREATE TRIGGER trg_architect_veto_after_insert
  AFTER INSERT ON public.governance_architect_vetoes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_architect_veto_after_insert();

-- Inmutabilidad de libros y eventos
CREATE TRIGGER trg_immutable_governance_case_events
  BEFORE UPDATE OR DELETE ON public.governance_case_events
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_immutable_change();

CREATE TRIGGER trg_immutable_governance_blue_book
  BEFORE UPDATE OR DELETE ON public.governance_blue_book
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_immutable_change();

CREATE TRIGGER trg_immutable_governance_silver_book
  BEFORE UPDATE OR DELETE ON public.governance_silver_book
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_immutable_change();

CREATE TRIGGER trg_immutable_governance_platinum_book
  BEFORE UPDATE OR DELETE ON public.governance_platinum_book
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_immutable_change();

CREATE TRIGGER trg_immutable_governance_alerts
  BEFORE UPDATE OR DELETE ON public.governance_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_immutable_change();

-- 9) Vistas de lectura soberana
CREATE OR REPLACE VIEW public.governance_sovereign_ledger AS
SELECT
  'blue'::TEXT AS ledger,
  bb.id::TEXT AS entry_id,
  bb.user_id AS actor_or_subject_user_id,
  bb.case_id,
  bb.entry_type,
  bb.notes,
  bb.payload,
  bb.created_at
FROM public.governance_blue_book bb
UNION ALL
SELECT
  'silver'::TEXT,
  sb.id::TEXT,
  sb.teacher_user_id,
  sb.case_id,
  sb.entry_type,
  sb.notes,
  sb.payload,
  sb.created_at
FROM public.governance_silver_book sb
UNION ALL
SELECT
  'platinum'::TEXT,
  pb.id::TEXT,
  pb.architect_user_id,
  pb.case_id,
  'architect_manifesto'::TEXT,
  pb.manifesto,
  pb.payload,
  pb.created_at
FROM public.governance_platinum_book pb;

-- 10) RLS
ALTER TABLE public.governance_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isabella_learning_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_case_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_appeals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_blue_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_silver_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_platinum_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_teacher_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_teaching_restrictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_architect_vetoes ENABLE ROW LEVEL SECURITY;

-- Lecturas públicas de marco normativo
CREATE POLICY "Governance protocols are publicly readable"
ON public.governance_protocols FOR SELECT
USING (true);

CREATE POLICY "Isabella library is readable by authenticated users"
ON public.isabella_learning_library FOR SELECT TO authenticated
USING (is_active = true);

-- Casos y alertas: sujeto + staff académico
CREATE POLICY "Users can read own governance cases"
ON public.governance_cases FOR SELECT TO authenticated
USING (
  auth.uid() = subject_user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
  OR public.has_role(auth.uid(), 'instructor')
);

CREATE POLICY "Staff can update governance cases"
ON public.governance_cases FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
  OR public.has_role(auth.uid(), 'instructor')
);

CREATE POLICY "Kernel can insert governance alerts"
ON public.governance_alerts FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = subject_user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
  OR public.has_role(auth.uid(), 'instructor')
);

CREATE POLICY "Users can read own governance alerts"
ON public.governance_alerts FOR SELECT TO authenticated
USING (
  auth.uid() = subject_user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
  OR public.has_role(auth.uid(), 'instructor')
);

CREATE POLICY "Users can read own case events"
ON public.governance_case_events FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.governance_cases gc
    WHERE gc.id = governance_case_events.case_id
      AND (
        gc.subject_user_id = auth.uid()
        OR public.has_role(auth.uid(), 'admin')
        OR public.has_role(auth.uid(), 'moderator')
        OR public.has_role(auth.uid(), 'instructor')
      )
  )
);

CREATE POLICY "Students can submit appeals within 24h"
ON public.governance_appeals FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = appellant_user_id
  AND EXISTS (
    SELECT 1
    FROM public.governance_cases gc
    WHERE gc.id = governance_appeals.case_id
      AND gc.subject_user_id = auth.uid()
      AND gc.appeal_deadline IS NOT NULL
      AND now() <= gc.appeal_deadline
  )
);

CREATE POLICY "Users can read own appeals"
ON public.governance_appeals FOR SELECT TO authenticated
USING (
  auth.uid() = appellant_user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
  OR public.has_role(auth.uid(), 'instructor')
);

CREATE POLICY "Users can read own blue book"
ON public.governance_blue_book FOR SELECT TO authenticated
USING (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
  OR public.has_role(auth.uid(), 'instructor')
);

CREATE POLICY "Staff can read silver and platinum books"
ON public.governance_silver_book FOR SELECT TO authenticated
USING (
  auth.uid() = teacher_user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
);

CREATE POLICY "Staff can read platinum book"
ON public.governance_platinum_book FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
);

CREATE POLICY "Staff can assign teacher points"
ON public.governance_teacher_points FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
);

CREATE POLICY "Teachers can read own points"
ON public.governance_teacher_points FOR SELECT TO authenticated
USING (
  auth.uid() = teacher_user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
);

CREATE POLICY "Staff can read teaching restrictions"
ON public.governance_teaching_restrictions FOR SELECT TO authenticated
USING (
  auth.uid() = teacher_user_id
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
);

CREATE POLICY "Architect veto insertion by admins"
ON public.governance_architect_vetoes FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can read architect vetoes"
ON public.governance_architect_vetoes FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'moderator')
);

GRANT SELECT ON public.governance_sovereign_ledger TO authenticated;
