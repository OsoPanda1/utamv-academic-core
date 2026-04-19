-- TAMV MD-X4 Federated Layer Foundation
-- Adds runtime-ready tables for protocols, memory, social, economy, and XR.

-- L1: MSR + BookPI
CREATE TABLE IF NOT EXISTS public.msr_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bookpi_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- L2: Protocols
CREATE TABLE IF NOT EXISTS public.protocol_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_key TEXT NOT NULL,
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stage TEXT NOT NULL,
  risk_level TEXT,
  objective TEXT NOT NULL,
  input JSONB NOT NULL DEFAULT '{}'::jsonb,
  decision JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.protocol_steps (
  id BIGSERIAL PRIMARY KEY,
  run_id UUID NOT NULL REFERENCES public.protocol_runs(id) ON DELETE CASCADE,
  step_key TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- L3: Guardian
CREATE TABLE IF NOT EXISTS public.guardian_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID REFERENCES public.protocol_runs(id) ON DELETE SET NULL,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- L5: Social runtime
CREATE TABLE IF NOT EXISTS public.social_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'public',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES public.social_channels(id) ON DELETE CASCADE,
  author_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.social_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  author_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.social_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.social_dm_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.social_dm_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.social_dm_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE (thread_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.social_dm_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.social_dm_threads(id) ON DELETE CASCADE,
  sender_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- L5: Economy + memberships
CREATE TABLE IF NOT EXISTS public.economy_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  balance NUMERIC(18,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ledger_internal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  direction TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  reason TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  monthly_quota INTEGER NOT NULL DEFAULT 100,
  renews_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.token_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  available_tokens INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- L4: XR + DreamSpaces
CREATE TABLE IF NOT EXISTS public.xr_dreamspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  access_policy TEXT NOT NULL DEFAULT 'public',
  scene_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.xr_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dreamspace_id UUID NOT NULL REFERENCES public.xr_dreamspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  state JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (dreamspace_id, user_id)
);

-- Cursor pagination indexes
CREATE INDEX IF NOT EXISTS idx_social_posts_channel_created_at ON public.social_posts(channel_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_social_comments_post_created_at ON public.social_comments(post_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_dm_messages_thread_created_at ON public.social_dm_messages(thread_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_ledger_internal_user_created_at ON public.ledger_internal(user_id, created_at DESC, id DESC);

-- RLS
ALTER TABLE public.msr_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookpi_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_dm_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_dm_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_dm_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.economy_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ledger_internal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xr_dreamspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xr_presence ENABLE ROW LEVEL SECURITY;

-- Read policies (authenticated baseline)
CREATE POLICY "Authenticated read social channels"
ON public.social_channels FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read posts"
ON public.social_posts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read comments"
ON public.social_comments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users manage own likes"
ON public.social_likes FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own wallet"
ON public.economy_wallets FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users read own ledger"
ON public.ledger_internal FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users read own membership"
ON public.memberships FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users read own token balance"
ON public.token_balances FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated read dreamspaces"
ON public.xr_dreamspaces FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users read own presence"
ON public.xr_presence FOR SELECT TO authenticated
USING (auth.uid() = user_id);
