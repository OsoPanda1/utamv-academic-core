
DROP VIEW IF EXISTS public.leaderboard_view;

CREATE VIEW public.leaderboard_view
WITH (security_invoker = on) AS
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
