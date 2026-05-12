# UTAMV Academic Core

Núcleo académico y operativo de **UTAMV Campus Online**. Este repositorio centraliza experiencia de estudiante, catálogo de cursos, telemetría académica, pagos y funciones edge sobre Supabase.

---

## 1) Objetivo del proyecto

UTAMV Academic Core busca operar una plataforma educativa soberana con:

- **Identidad y sesiones tipadas** (roles, auth state, controles admin).
- **Campus modular** (catálogo, dashboard, rutas formativas, progreso).
- **Comercio académico** (pricing, checkout, suscripciones).
- **Telemetría** (eventos de uso y observabilidad básica).
- **Operación segura** (RLS, MFA para admin write-paths, validación/rate limiting en edge).

---

## 2) Stack tecnológico

### Frontend
- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- TanStack Query

### Backend / Datos
- Supabase Postgres
- Supabase Auth
- Supabase Edge Functions (Deno)

### Calidad
- Vitest
- ESLint
- TypeScript strict checks (según `tsconfig.app.json`)

---

## 3) Estructura del repositorio

```txt
.
├─ src/
│  ├─ modules/
│  │  ├─ campus/
│  │  ├─ commerce/
│  │  ├─ identity/
│  │  └─ telemetry/
│  ├─ pages/
│  ├─ components/
│  └─ integrations/supabase/
├─ supabase/
│  ├─ migrations/
│  ├─ functions/
│  ├─ seed/
│  └─ tests/
├─ scripts/
├─ public/
└─ docs/
```

### Carpetas clave
- `src/modules/campus`: modelo de cursos, hooks y componentes de campus.
- `src/modules/identity`: sesión de usuario tipada y helpers de roles.
- `src/modules/commerce`: pricing de planes UTAMV.
- `src/modules/telemetry`: logging de eventos y consola de telemetría.
- `supabase/migrations`: esquema SQL y hardening RLS.
- `supabase/functions`: endpoints edge (checkout, stripe webhook, certificaciones, IA, etc.).
- `scripts/seedCourses.ts`: seed de catálogo hacia Supabase.

---

## 4) Módulos funcionales implementados

## 4.1 Campus
- Catálogo de cursos desde DB (`useCoursesFromDb`) o seed JSON (`useCourses`).
- `CampusLayout` montado sobre `UtamvAppShell`.
- `StudentDashboard` + `CampusCourseLibrary`.
- Ruta protegida `/campus` y sección `/campus/cursos`.

## 4.2 Identity
- `UserRole`: `student | teacher | admin`.
- `useAuthSession()` para exponer `{ user, accessToken }`.
- Helpers `isAdmin`, `isTeacher`, `isStudent`.

## 4.3 Commerce
- `calculateUtamvCampusPrice(ctx)` para desglose base/descuento/total.
- Hook `useCampusPricing` para UI.
- Edge function `create-course-checkout` para Stripe checkout.

## 4.4 Telemetry
- `logTelemetryEvent(payload)` inserta en `telemetry_events`.
- `TelemetryConsole` para vista tipo console/observabilidad.
- Eventos de visita campus instrumentados desde layout.

## 4.5 Health y Analytics
- Health endpoint frontend: `GET /health`.
- Página protegida `/analytics` con consola de telemetría.

---

## 5) Base de datos y migraciones

### Catálogo de cursos
Migraciones clave:
- `20260512153000_create_utamv_courses_catalog.sql`
  - `courses`
  - `course_sections`
  - `course_projects`

### Seguridad/RLS hardening
- `20260512170000_security_hardening_rls_mfa.sql`
  - Revoca grants públicos amplios.
  - Re-otorga lectura controlada a `anon/authenticated`.
  - Crea `public.is_admin_mfa()` (requiere role `admin` + `aal2`).
  - Políticas de escritura admin con MFA para tablas de catálogo.

### Pruebas SQL de políticas
- `supabase/tests/rls_roles.sql` para simular claims JWT y validar comportamiento esperado.

---

## 6) Seed de cursos

Archivos:
- `supabase/seed/utamv_courses.json` (fuente de seed)
- `public/utamv_courses.json` (consumo frontend estático)

Ejecutar seed en DB:

```bash
export SUPABASE_URL="https://<project>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
npm run seed:courses
```

> `seed:courses` usa `scripts/seedCourses.ts`.

---

## 7) Edge security

Helper compartido: `supabase/functions/_shared/security.ts`
- `parseCheckoutPayload`: validación de payload.
- `checkRateLimit`: rate limit en memoria por ventana.
- `withTimeout`: timeout para operaciones remotas.
- `getClientIp`: extracción de IP del request.

Integrado en:
- `supabase/functions/create-course-checkout/index.ts`.

---

## 8) Setup local

## Requisitos
- Node.js 20+
- npm
- Proyecto Supabase configurado

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```

## Build
```bash
npm run build
```

---

## 9) Scripts npm

- `npm run dev` → desarrollo local Vite
- `npm run build` → build producción
- `npm run preview` → preview local del build
- `npm run lint` → lint del proyecto
- `npm run typecheck` → chequeo TypeScript
- `npm run test` → pruebas Vitest
- `npm run ci` → lint + typecheck + test + build
- `npm run seed:courses` → seed catálogo en Supabase

---

## 10) Variables de entorno esperadas

### Frontend / Supabase
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Edge Functions / Server
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- (según función) `STRIPE_PRICE_*`

---

## 11) Seguridad y operación (producción)

Checklist mínimo:
- MFA activa para cuentas admin.
- JWT corto para sesiones privilegiadas + refresh rotation.
- RLS aplicada y verificada con tests SQL.
- Rate limiting + validación + timeouts en funciones críticas.
- Backups diarios de Postgres + retención + restore drills.
- Pentest externo antes de go-live.

Referencia operativa: `docs/security/production-readiness.md`.

---

## 12) Rutas principales

- `/` → sitio público
- `/auth/login` → autenticación
- `/campus` → dashboard estudiante
- `/campus/cursos` → catálogo
- `/analytics` → telemetría académica
- `/health` → health check

---

## 13) Convenciones de contribución

- Flujo de contribución: `CONTRIBUTING.md`
- Lockfile canónico: `package-lock.json` (usar npm)
- Mantener módulos por dominio (`identity`, `commerce`, `telemetry`, `campus`)
- Toda modificación sensible de datos debe incluir:
  - migración SQL,
  - política RLS,
  - evidencia de test (app o SQL),
  - nota de impacto operativo.

---

## 14) Estado actual y próximos pasos

Estado:
- Arquitectura modular base implementada.
- Catálogo + seed + DB + shell UX + dashboard disponibles.
- Hardening inicial de seguridad en checkout y RLS aplicado.

Siguientes hitos:
1. Endurecer más edge functions críticas (webhooks, retries, idempotencia global).
2. Integrar dashboards reales de observabilidad (Sentry/OTel/Grafana).
3. Automatizar pruebas de seguridad (RLS regression + abuse tests).
4. Publicar release semántico y changelog formal.

---

## Licencia

Uso interno UTAMV / TAMV salvo indicación contraria.
