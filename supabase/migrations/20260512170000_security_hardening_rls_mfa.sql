-- Grants baseline
revoke all on table public.courses from public;
revoke all on table public.course_sections from public;
revoke all on table public.course_projects from public;

grant select on table public.courses to anon, authenticated;
grant select on table public.course_sections to anon, authenticated;
grant select on table public.course_projects to anon, authenticated;

-- Ensure JWT-based role helper
create or replace function public.is_admin_mfa()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
    and coalesce(auth.jwt() ->> 'aal', '') = 'aal2';
$$;

-- Defensive write policies (service role bypasses RLS)
drop policy if exists "Admin write courses with MFA" on public.courses;
create policy "Admin write courses with MFA"
  on public.courses
  for all
  to authenticated
  using (public.is_admin_mfa())
  with check (public.is_admin_mfa());

drop policy if exists "Admin write sections with MFA" on public.course_sections;
create policy "Admin write sections with MFA"
  on public.course_sections
  for all
  to authenticated
  using (public.is_admin_mfa())
  with check (public.is_admin_mfa());

drop policy if exists "Admin write projects with MFA" on public.course_projects;
create policy "Admin write projects with MFA"
  on public.course_projects
  for all
  to authenticated
  using (public.is_admin_mfa())
  with check (public.is_admin_mfa());
