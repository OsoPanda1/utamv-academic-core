create table if not exists public.courses (
  id text primary key,
  title text not null,
  slug text not null unique,
  short_description text not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  category text not null,
  estimated_hours integer not null default 0,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists courses_slug_idx on public.courses (slug);
create index if not exists courses_category_idx on public.courses (category);

create table if not exists public.course_sections (
  id text primary key,
  course_id text not null references public.courses (id) on delete cascade,
  title text not null,
  "order" integer not null,
  kind text not null check (kind in ('lecture', 'lab', 'assignment', 'quiz', 'project')),
  slug text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists course_sections_course_id_order_idx on public.course_sections (course_id, "order");

create table if not exists public.course_projects (
  id text primary key,
  course_id text not null references public.courses (id) on delete cascade,
  title text not null,
  repo_url text,
  description text not null,
  technologies text[] not null default '{}',
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists course_projects_course_id_idx on public.course_projects (course_id);

alter table public.courses enable row level security;
alter table public.course_sections enable row level security;
alter table public.course_projects enable row level security;

create policy if not exists "Courses are readable by everyone" on public.courses for select using (true);
create policy if not exists "Course sections are readable by everyone" on public.course_sections for select using (true);
create policy if not exists "Course projects are readable by everyone" on public.course_projects for select using (true);
