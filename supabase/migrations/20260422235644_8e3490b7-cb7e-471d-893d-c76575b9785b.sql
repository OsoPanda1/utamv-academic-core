
-- Catálogo de insignias
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'award',
  color TEXT NOT NULL DEFAULT '#C9A84C',
  tier TEXT NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze','silver','gold','platinum','quantum')),
  tokens_reward INTEGER NOT NULL DEFAULT 10,
  criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges are public catalog"
  ON public.badges FOR SELECT
  USING (true);

CREATE POLICY "Admins manage badges"
  ON public.badges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insignias por usuario
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  context JSONB DEFAULT '{}'::jsonb,
  UNIQUE (user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view all earned badges for ranking"
  ON public.user_badges FOR SELECT
  USING (true);

CREATE POLICY "Admins grant badges"
  ON public.user_badges FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_user_badges_user ON public.user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON public.user_badges(badge_id);

-- Tabla de tokens UTAMV (economía simbólica)
CREATE TABLE IF NOT EXISTS public.user_tokens (
  user_id UUID PRIMARY KEY,
  balance INTEGER NOT NULL DEFAULT 0,
  total_earned INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tokens are publicly visible for ranking"
  ON public.user_tokens FOR SELECT
  USING (true);

CREATE POLICY "Admins manage tokens"
  ON public.user_tokens FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Función segura: otorgar insignia + tokens
CREATE OR REPLACE FUNCTION public.grant_badge(_user_id UUID, _badge_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_badge_id UUID;
  v_reward INTEGER;
  v_already BOOLEAN;
BEGIN
  SELECT id, tokens_reward INTO v_badge_id, v_reward
  FROM public.badges WHERE code = _badge_code;

  IF v_badge_id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'badge_not_found');
  END IF;

  SELECT EXISTS(SELECT 1 FROM public.user_badges WHERE user_id = _user_id AND badge_id = v_badge_id)
    INTO v_already;
  IF v_already THEN
    RETURN jsonb_build_object('ok', true, 'already', true);
  END IF;

  INSERT INTO public.user_badges (user_id, badge_id) VALUES (_user_id, v_badge_id);

  INSERT INTO public.user_tokens (user_id, balance, total_earned)
  VALUES (_user_id, v_reward, v_reward)
  ON CONFLICT (user_id) DO UPDATE
  SET balance = user_tokens.balance + v_reward,
      total_earned = user_tokens.total_earned + v_reward,
      level = GREATEST(1, (user_tokens.total_earned + v_reward) / 100 + 1),
      updated_at = now();

  RETURN jsonb_build_object('ok', true, 'badge_id', v_badge_id, 'reward', v_reward);
END;
$$;

-- Vista de ranking público
CREATE OR REPLACE VIEW public.leaderboard_view AS
SELECT
  p.user_id,
  COALESCE(p.display_name, p.full_name, 'Estudiante UTAMV') AS display_name,
  p.avatar_url,
  COALESCE(t.balance, 0) AS tokens,
  COALESCE(t.level, 1) AS level,
  (SELECT COUNT(*) FROM public.user_badges ub WHERE ub.user_id = p.user_id) AS badges_count,
  (SELECT COUNT(*) FROM public.lesson_progress lp WHERE lp.user_id = p.user_id AND lp.completed = true) AS lessons_completed
FROM public.profiles p
LEFT JOIN public.user_tokens t ON t.user_id = p.user_id
ORDER BY tokens DESC, lessons_completed DESC;

-- Seed de insignias
INSERT INTO public.badges (code, name, description, icon, color, tier, tokens_reward) VALUES
  ('first_step', 'Primer Paso', 'Completaste tu primera lección en UTAMV', 'footprints', '#CD7F32', 'bronze', 10),
  ('module_master', 'Maestro de Módulo', 'Completaste un módulo completo', 'graduation-cap', '#C0C0C0', 'silver', 50),
  ('diplomado_champion', 'Campeón Diplomado', 'Graduado del Diplomado en Ecosistemas Digitales', 'trophy', '#C9A84C', 'gold', 200),
  ('tutor_whisperer', 'Susurrador IA', 'Mantuviste 25 conversaciones con el tutor IA', 'sparkles', '#9B72CF', 'silver', 40),
  ('community_builder', 'Constructor Comunidad', '10 publicaciones aceptadas en el foro UTAMV', 'users', '#5CBDB9', 'silver', 60),
  ('quantum_pioneer', 'Pionero Quantum', 'Activaste el kernel TAMV Isabella', 'atom', '#E5E4E2', 'quantum', 500)
ON CONFLICT (code) DO NOTHING;
