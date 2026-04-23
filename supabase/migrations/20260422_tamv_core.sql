-- ==========================================
-- TAMV KERNEL: INFRAESTRUCTURA ZERO-TRUST
-- ==========================================

-- 1. Tabla de Telemetría Cognitiva (Nervio Central)
CREATE TABLE IF NOT EXISTS public.tamvcrums_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action_type VARCHAR(255) NOT NULL,
    module VARCHAR(255) NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Seguridad Zero-Trust (RLS)
ALTER TABLE public.tamvcrums_logs ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Acceso Estrictas (Dignity-by-Design)
-- Los usuarios solo pueden insertar sus propios registros
CREATE POLICY "Permitir inserción a usuarios autenticados"
ON public.tamvcrums_logs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Solo los administradores (o la IA Isabella con service_role) pueden leer los registros
CREATE POLICY "Lectura exclusiva para Kernel y Administradores"
ON public.tamvcrums_logs FOR SELECT
TO authenticated
USING ( (auth.jwt() ->> 'role') = 'tamv_admin' );
