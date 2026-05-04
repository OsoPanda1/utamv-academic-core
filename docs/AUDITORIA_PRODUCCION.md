# Auditoría de producción · UTAMV Campus Online (consolidada)

> **Versión activa:** este documento reemplaza las auditorías anteriores
> (`AUDITORIA_PRODUCCION_2026-04-19.md` y `AUDITORIA_PRODUCCION_2026.md`),
> ahora retiradas para evitar información desactualizada.

## 1. Estado real (verificado contra el código)

| Capa | Estado | Notas |
|---|---|---|
| Auth (email/password + Google) | ✅ Operativo | `AuthContext`, `handle_new_user` trigger, HIBP activo |
| RLS en todas las tablas de usuario | ✅ Activa | `profiles`, `enrollments`, `lesson_progress`, `certificates`, `tts_jobs`, etc. |
| Catálogo de cursos | ✅ Híbrido | `COURSES` local + fallback BD (`Campus.tsx`, `CourseViewer.tsx`) |
| Portadas reales | ✅ Cableadas | `src/lib/courseCovers.ts` mapea slug → `src/assets/*.png` |
| Checkout Stripe (one-shot) | ✅ Operativo | `create-course-checkout` con enrollment optimista |
| Webhook Stripe (HMAC + idempotencia) | ✅ Implementado | `stripe-webhook` requiere `STRIPE_WEBHOOK_SECRET` |
| Suscripciones recurrentes | ⏸️ No habilitadas | `Pricing.tsx` muestra planes pero el flujo no está activo |
| Certificados PDF + QR + BlockUTAMV | ✅ Operativo | `generate-certificate` + `verify-certificate` |
| Gamificación (badges, tokens, ranking) | ✅ Operativo | `grant_badge` RPC + `/ranking` |
| TTS narraciones (ElevenLabs + fallback) | ✅ Operativo | `/admin/tts-narraciones` |
| Telemetría Isabella | ✅ Operativo | `/admin/telemetria-isabella` |

## 2. Pendientes priorizados

1. **Configurar `STRIPE_WEBHOOK_SECRET`** y registrar la URL del webhook en
   Stripe Dashboard:
   `https://wjcgihlaauyztgovjeji.supabase.co/functions/v1/stripe-webhook`
   con eventos: `checkout.session.completed`, `checkout.session.expired`,
   `charge.refunded`, `charge.dispute.created`.
2. (Opcional) Activar suscripciones — requiere `create-subscription`,
   `check-subscription`, `customer-portal` y precios reales en Stripe.
3. (Opcional) Tests Vitest de flujos críticos: enrollment, certificado,
   permisos RLS por rol.

## 3. Lo que NO aplica (descartado oficialmente)

- ❌ `vercel.json` / security headers de Vercel (Lovable Cloud gestiona hosting).
- ❌ GitHub Actions / scripts de backup (Supabase tiene backups automáticos).
- ❌ TS `strict: true` global (Lovable usa estricto progresivo deliberado).
- ❌ `lucide-react/dist/esm/icons/*` (rompe tree-shaking de Vite).
- ❌ Redis para rate limiting (no existe en Lovable Cloud; usar Postgres).
