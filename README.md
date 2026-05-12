# UTAMV Academic Core

Plataforma académica UTAMV construida con **React + Vite + TypeScript + Supabase**.

## Resumen ejecutivo
UTAMV Academic Core es el núcleo operativo académico para experiencia de campus, progreso formativo, certificación e integraciones de datos. El repositorio prioriza seguridad (RLS), trazabilidad y despliegue moderno (frontend estático + edge functions).

## Stack
- Frontend: Vite, React, TypeScript, Tailwind, shadcn/ui.
- Datos y backend: Supabase (Postgres, Auth, Edge Functions).
- Testing: Vitest + Testing Library.

## Estructura actual
- `src/` — frontend y flujos de campus.
- `supabase/migrations/` — esquema SQL, seguridad, políticas.
- `supabase/functions/` — webhooks, pagos, verificación, IA.
- `infra/k8s/` — manifiestos de infraestructura complementaria.
- `docs/` — documentación técnica y estándares.

Ver mapeo detallado a federaciones en `docs/ARCHITECTURE_MAP.md`.

## Producción y despliegue
1. Configurar variables de entorno de Supabase y Stripe.
2. Ejecutar migraciones SQL en `supabase/migrations`.
3. Ejecutar validaciones: `npm run lint && npm run test && npm run build`.
4. Desplegar frontend (Vercel/Netlify) y edge functions de Supabase.

## Seguridad mínima recomendada
- Habilitar MFA en Supabase Auth.
- Activar rate limit en funciones críticas (`create-subscription`, `stripe-webhook`).
- Configurar WAF/CDN y cabeceras CSP/STS en hosting.

## Contribución
- Flujo y convenciones: `CONTRIBUTING.md`.
- Gestor de paquetes oficial: **npm** (`package-lock.json` como lockfile canónico).
