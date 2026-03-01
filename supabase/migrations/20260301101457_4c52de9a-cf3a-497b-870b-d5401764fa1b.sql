-- Fix search_path on generate_certificate_number
CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE cert_num TEXT;
BEGIN
  cert_num := 'UTAMV-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN cert_num;
END;
$$;

-- Fix search_path on update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;