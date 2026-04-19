-- TAMV academic governance + webhook persistence
create table if not exists public.academic_policy_versions (
  id uuid primary key default gen_random_uuid(),
  policy_code text not null,
  version text not null,
  status text not null check (status in ('draft', 'active', 'retired')),
  policy_body jsonb not null,
  activated_at timestamptz,
  created_at timestamptz not null default now(),
  unique (policy_code, version)
);

create table if not exists public.academic_integrity_incidents (
  id uuid primary key default gen_random_uuid(),
  run_id text,
  user_id text,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  incident_type text not null,
  incident_payload jsonb not null,
  resolution_status text not null default 'open' check (resolution_status in ('open', 'under_review', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.protocol_webhook_endpoints (
  id uuid primary key default gen_random_uuid(),
  endpoint_key text not null unique,
  endpoint_url text not null,
  secret_ref text not null,
  active boolean not null default true,
  subscribed_events text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.protocol_webhook_deliveries (
  id uuid primary key default gen_random_uuid(),
  endpoint_id uuid not null references public.protocol_webhook_endpoints(id) on delete cascade,
  run_id text,
  event_type text not null,
  signature text not null,
  payload jsonb not null,
  delivery_status text not null default 'queued' check (delivery_status in ('queued', 'sent', 'failed')),
  response_code integer,
  response_body text,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_academic_integrity_incidents_run_id
  on public.academic_integrity_incidents(run_id);

create index if not exists idx_protocol_webhook_deliveries_endpoint
  on public.protocol_webhook_deliveries(endpoint_id, created_at desc);
