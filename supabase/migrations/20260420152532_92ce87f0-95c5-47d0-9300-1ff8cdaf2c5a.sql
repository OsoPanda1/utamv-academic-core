
-- Bucket público para multimedia académico (videos cortos IA, audios narrados, transcripciones)
INSERT INTO storage.buckets (id, name, public)
VALUES ('lessons-media', 'lessons-media', true)
ON CONFLICT (id) DO NOTHING;

-- Lectura pública de los assets multimedia
CREATE POLICY "Lessons media publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'lessons-media');

-- Solo administradores pueden subir/actualizar/borrar
CREATE POLICY "Admins can manage lessons media"
ON storage.objects FOR ALL
USING (bucket_id = 'lessons-media' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'lessons-media' AND public.has_role(auth.uid(), 'admin'));
