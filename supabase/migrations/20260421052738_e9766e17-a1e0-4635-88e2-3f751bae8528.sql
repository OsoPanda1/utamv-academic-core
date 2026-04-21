UPDATE public.lessons SET video_url = CASE module_id
  WHEN 'a1111111-0000-4000-8000-000000000001'::uuid THEN 'https://wjcgihlaauyztgovjeji.supabase.co/storage/v1/object/public/lessons-media/videos/modulo-fundamentos.mp4'
  WHEN 'a1111111-0000-4000-8000-000000000002'::uuid THEN 'https://wjcgihlaauyztgovjeji.supabase.co/storage/v1/object/public/lessons-media/videos/modulo-uxui.mp4'
  WHEN 'a1111111-0000-4000-8000-000000000003'::uuid THEN 'https://wjcgihlaauyztgovjeji.supabase.co/storage/v1/object/public/lessons-media/videos/modulo-backend.mp4'
  WHEN 'a1111111-0000-4000-8000-000000000004'::uuid THEN 'https://wjcgihlaauyztgovjeji.supabase.co/storage/v1/object/public/lessons-media/videos/modulo-ia.mp4'
  WHEN 'a1111111-0000-4000-8000-000000000005'::uuid THEN 'https://wjcgihlaauyztgovjeji.supabase.co/storage/v1/object/public/lessons-media/videos/modulo-lanzamiento.mp4'
END
WHERE module_id IN (
  'a1111111-0000-4000-8000-000000000001'::uuid,
  'a1111111-0000-4000-8000-000000000002'::uuid,
  'a1111111-0000-4000-8000-000000000003'::uuid,
  'a1111111-0000-4000-8000-000000000004'::uuid,
  'a1111111-0000-4000-8000-000000000005'::uuid
);