BEGIN;

CREATE OR REPLACE FUNCTION public.user_has_course_access(p_user_id uuid, p_course_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.enrollments e
    WHERE e.user_id = p_user_id
      AND e.course_id = p_course_id
      AND e.status = 'active'
  )
  OR EXISTS (
    SELECT 1
    FROM public.course_purchases cp
    WHERE cp.user_id = p_user_id
      AND cp.course_id = p_course_id
      AND cp.status IN ('active','completed')
      AND cp.access_revoked = false
  );
$$;

CREATE OR REPLACE FUNCTION public.get_lesson_media_secure(
  p_course_slug text,
  p_lesson_title text
)
RETURNS TABLE (
  lesson_id uuid,
  title text,
  transcript text,
  video_url text,
  audio_url text,
  is_locked boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_course_id uuid;
  v_uid uuid;
  v_has_access boolean := false;
BEGIN
  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT c.id INTO v_course_id FROM public.courses c WHERE c.slug = p_course_slug LIMIT 1;
  IF v_course_id IS NULL THEN
    RAISE EXCEPTION 'Course not found';
  END IF;

  v_has_access := public.user_has_course_access(v_uid, v_course_id);

  RETURN QUERY
  SELECT
    l.id,
    l.title,
    l.transcript,
    CASE
      WHEN v_has_access OR l.is_free_preview OR coalesce(cm.is_free_preview, false) THEN l.video_url
      ELSE NULL
    END AS video_url,
    CASE
      WHEN v_has_access OR l.is_free_preview OR coalesce(cm.is_free_preview, false) THEN l.audio_url
      ELSE NULL
    END AS audio_url,
    NOT (v_has_access OR l.is_free_preview OR coalesce(cm.is_free_preview, false)) AS is_locked
  FROM public.lessons l
  LEFT JOIN public.course_modules cm ON cm.id = l.module_id
  WHERE l.course_id = v_course_id
    AND l.title = p_lesson_title
  LIMIT 1;
END;
$$;

REVOKE ALL ON FUNCTION public.get_lesson_media_secure(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_lesson_media_secure(text, text) TO authenticated;

COMMIT;
