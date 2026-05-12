-- role simulation via jwt claims
begin;

set local role authenticated;
set local request.jwt.claims = '{"sub":"user-1","role":"authenticated","aal":"aal1","app_metadata":{"role":"student"}}';

select count(*) from public.courses; -- should pass

-- should fail for non-admin/non-mfa (run manually in CI harness expecting error)
-- insert into public.courses (id,title,slug,short_description,level,category,estimated_hours)
-- values ('x','x','x','x','beginner','test',1);

set local request.jwt.claims = '{"sub":"admin-1","role":"authenticated","aal":"aal2","app_metadata":{"role":"admin"}}';
-- should pass
-- insert into public.courses (id,title,slug,short_description,level,category,estimated_hours)
-- values ('admin-test','x','admin-test','x','beginner','test',1);

rollback;
