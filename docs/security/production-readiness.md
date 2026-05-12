# UTAMV Security Readiness Plan

## Auth
- Enforce MFA (`aal2`) for admin mutations via `public.is_admin_mfa()` RLS helper.
- Keep short JWT lifetimes for admin sessions (recommended 15-30 min) and require refresh rotation.

## Edge Functions
- Input validation is required before DB/Stripe calls.
- Per-IP rate limiting enabled in edge security helper.
- Timeout wrapper enabled for remote/database operations.

## Backups
- Configure daily automated Postgres backups in Supabase project settings.
- Keep 30-day retention plus weekly off-platform export.
- Run quarterly restore drill in staging.

## Pentest
- Schedule external pentest before production launch.
- Scope: auth/session management, RLS bypass, edge function abuse, payment webhooks.
- Exit criteria: no critical/high unresolved findings.
