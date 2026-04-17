-- Storage bucket público para PDFs de certificados
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas: lectura pública, escritura solo service role
CREATE POLICY "Certificates are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates');

-- BlockUTAMV: cadena inmutable de hashes encadenados
CREATE TABLE public.block_utamv_chain (
  id BIGSERIAL PRIMARY KEY,
  block_index BIGINT NOT NULL UNIQUE,
  certificate_id UUID NOT NULL,
  certificate_number TEXT NOT NULL,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  data_hash TEXT NOT NULL,
  previous_hash TEXT NOT NULL,
  block_hash TEXT NOT NULL UNIQUE,
  nonce TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_block_chain_cert ON public.block_utamv_chain(certificate_id);
CREATE INDEX idx_block_chain_number ON public.block_utamv_chain(certificate_number);

ALTER TABLE public.block_utamv_chain ENABLE ROW LEVEL SECURITY;

CREATE POLICY "BlockUTAMV chain is publicly verifiable"
ON public.block_utamv_chain FOR SELECT
USING (true);

-- Solo service role puede insertar (vía edge function); no policy = denied for authenticated/anon
-- pero necesitamos permitir al servidor: lo gestionamos vía service_role key (bypass RLS)

-- Función helper para obtener el último bloque
CREATE OR REPLACE FUNCTION public.get_last_block()
RETURNS TABLE(block_index BIGINT, block_hash TEXT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT block_index, block_hash
  FROM public.block_utamv_chain
  ORDER BY block_index DESC
  LIMIT 1;
$$;