# UTAMV Architecture Map (estado actual)

Este documento conecta la estructura real del repositorio con las federaciones del canon TAMV.

## Estructura real
- `src/`: aplicación React/Vite (UI, rutas, servicios cliente).
- `supabase/migrations/`: esquema de datos, RLS y lógica SQL.
- `supabase/functions/`: edge functions (pagos, verificación, IA, medios).
- `infra/k8s/`: manifiestos de infraestructura complementaria.
- `docs/`: estándares, despliegue y planeación.

## Mapeo por federación

### 1) Federación Académica
- `src/pages`
- `src/components`
- Flujos de progreso/certificación (front + funciones asociadas)

### 2) Federación de Datos
- `supabase/migrations`
- `supabase/config.toml`

### 3) Federación de IA
- `supabase/functions/utamv-ai-tutor`
- `supabase/functions/isabella-kernel`
- `supabase/functions/generate-lesson-narration`

### 4) Federación de Seguridad
- Políticas SQL/RLS y hardening en migraciones
- `supabase/functions/stripe-webhook`
- `supabase/functions/create-subscription`

### 5) Federación de Infraestructura
- `infra/k8s`
- pipeline de build/test/deploy (pendiente formalizar en CI)

### 6) Federación de Gobernanza
- Estándares y lineamientos en `docs/`
- Convenciones en `CONTRIBUTING.md`

### 7) Federación de Integración Cívica
- Integraciones de telemetría y trazabilidad (SQL + edge functions)

## Nota de estado
- Despliegue primario: frontend estático + Supabase Edge Functions.
- `infra/k8s` se mantiene como infraestructura complementaria y/o legado operativo; validar su uso activo por entorno.
