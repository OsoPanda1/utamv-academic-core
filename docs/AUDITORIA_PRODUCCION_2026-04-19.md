# Auditoría técnica profunda — TAMV Academic Core

**Fecha de corte:** 19 de abril de 2026  
**Objetivo:** medir avance real hacia producción y despliegue, identificar brechas y generar checklist accionable.

---

## 1) Metodología usada

1. Revisión estructural del repositorio (frontend, edge functions, migraciones, configuración).
2. Verificación de controles de calidad ejecutables en entorno local:
   - `npm run test`
   - `npm run build`
   - `npm run lint`
3. Mapeo contra arquitectura federada TAMV (L0–L7).
4. Scoring ponderado (100 puntos) para estimar porcentaje real de preparación productiva.

---

## 2) Hallazgos ejecutivos

- El proyecto actual **sí tiene base funcional de campus académico** (autenticación, cursos, pagos, certificados y chat global), pero todavía está en estado **MVP avanzado**, no en estado “plataforma civilizatoria completa”.
- La mayor parte de capacidades TAMV de alto nivel (protocolos, MSR/BookPI, guardianía XR, economía interna/membresías, social avanzada, DreamSpaces) **no está implementada** en código operativo.
- Existe deuda técnica crítica para release:
  - `lint` falla con errores de tipado/estilo.
  - TypeScript no está en modo estricto real.
  - Suite de pruebas muy limitada.
  - Sin evidencia de pipeline CI/CD ni observabilidad de producción.

---

## 3) Estado por capas federadas (L0–L7)

### L0 — Doctrina & Ética
**Estado:** Parcial (documental + SQL de gobernanza, poco acoplamiento operativo con app).  
**Evidencia:** migración robusta de gobernanza RIS con tablas, triggers y políticas; no se observa consumo activo desde frontend/backend de app.

### L1 — Memoria & Registro (MSR/BookPI)
**Estado:** No implementado.  
**Evidencia:** no existen módulos `msr.*`/`bookpi.*` ni adaptadores operativos.

### L2 — Protocolos controlados
**Estado:** No implementado.  
**Evidencia:** ausencia de `protocol.*` engine/orchestrator/lifecycle/constitution en el repositorio.

### L3 — Guardianía & monitoreo
**Estado:** No implementado en runtime.  
**Evidencia:** no hay `protocol.monitoring.guardian.ts` ni modelos de threat-level integrados al frontend operativo.

### L4 — XR/VR/3D/4D
**Estado:** No implementado.  
**Evidencia:** no existen `xr.gateway.ts`, `xr.renderer.adapter.ts`, `dreamspaces.service.ts`, ni shell XR funcional.

### L5 — Servicios de dominio
**Estado:** Parcial.  
**Disponible:** auth básica, perfiles, cursos, inscripciones, certificados, chat global, tutor IA, checkout.  
**Faltante crítico:** identidad avanzada ID‑NVIDA, social completa (grupos/canales/DM/streaming/video), economía interna/ledger/membresías/tokens.

### L6 — Shell UX & integración
**Estado:** Parcial alto para web 2D, bajo para integración total TAMV.  
**Disponible:** rutas públicas, auth, campus, control escolar, foro (foro mayormente estático).  
**Faltante:** shell unificado con flujos de plataforma social completa + integración a capas L1–L5 extendidas.

### L7 — Quantum-inspired
**Estado:** No implementado.  
**Evidencia:** no hay pipelines de decisión desacoplados con abstracciones listas para backends híbridos.

---

## 4) Checklist de incompletos (producción y despliegue)

## A. Bloqueadores (impiden salida confiable a producción)

- [ ] Corregir errores de `eslint` (actualmente falla).  
- [ ] Habilitar TypeScript estricto real (`strict: true`, `noImplicitAny`, `strictNullChecks`) y remediar deuda de tipos.  
- [ ] Incrementar cobertura de pruebas (actualmente 1 test de ejemplo).  
- [ ] Definir pipeline CI/CD mínimo (build + test + lint + deploy + rollback).
- [ ] Implementar observabilidad productiva (logs estructurados, tracing, alertas, health checks).
- [ ] Plan formal de seguridad operativa (gestión de secretos, rotación de llaves, controles anti abuso/rate limit en funciones críticas).

## B. Críticos de producto TAMV (brecha contra visión objetivo)

- [ ] Implementar núcleo de protocolos TAMV (`protocol.*` + orchestrator + adapters MSR/BookPI).
- [ ] Implementar MSR + BookPI operativos y conectados a eventos del sistema.
- [ ] Implementar Guardian de monitoreo y traducción visual de estados.
- [ ] Implementar capa XR/DreamSpaces funcional (crear/entrar/permisos/persistencia).
- [ ] Implementar social completo: canales, grupos, DM, publicaciones multimedia, comentarios, likes, compartidos.
- [ ] Implementar streaming + señalización de videollamadas y modelo de rooms.
- [ ] Implementar economía interna (`economy.service.ts`, `ledger.internal.ts`, `memberships.service.ts`, `tokens.service.ts`) con permisos por membresía.
- [ ] Integrar EOCT e Isabella a runtime (no solo esquema SQL).

## C. Importantes de calidad/performance

- [ ] Resolver warning CSS de `@import` para evitar comportamiento no determinista en pipeline CSS.
- [ ] Reducir peso de bundle principal (>500 kB), aplicar code splitting y lazy loading.
- [ ] Optimizar activos pesados (logo oficial ~2.3 MB en build).
- [ ] Endurecer esquema de errores tipados en frontend y edge functions (evitar `any`).
- [ ] Estandarizar contratos API (tipos compartidos y versionado).

## D. Listo para despliegue continuo empresarial

- [ ] Ambientes separados y versionados: `dev`, `staging`, `prod` con promoción controlada.
- [ ] Runbooks operativos (incidentes, restauración, recuperación).
- [ ] Políticas de backup/restore verificadas para base y storage.
- [ ] Auditoría y trazabilidad centralizada de eventos críticos (no solo tablas aisladas).

---

## 5) Porcentaje real de avance para producción y despliegue

## Modelo de puntuación (100 pts)

1. **Fundación app web (UX funcional actual)** — 15 pts  
2. **Servicios de dominio core en runtime** — 20 pts  
3. **Arquitectura TAMV L0–L7 implementada** — 25 pts  
4. **Calidad técnica (tipado, lint, pruebas)** — 15 pts  
5. **Seguridad y gobierno operativo** — 10 pts  
6. **DevOps/CI/CD/observabilidad** — 10 pts  
7. **Performance y hardening release** — 5 pts

## Resultado estimado actual

- Fundación app web: **12/15**
- Servicios de dominio core: **9/20**
- Arquitectura TAMV L0–L7: **4/25**
- Calidad técnica: **4/15**
- Seguridad/gobierno operativo: **5/10**
- DevOps/CI/CD/observabilidad: **1/10**
- Performance/hardening: **2/5**

**Total: 37/100 → 37% de preparación real para producción y despliegue.**

> Interpretación: hoy el sistema puede operar como campus MVP controlado, pero no está listo para escalar de forma segura y sostenida como plataforma TAMV MD‑X4 completa en producción plena.

---

## 6) Recomendación de ruta de cierre

### Fase 1 (0–3 semanas): “Go/No-Go técnico base”
- Cerrar lint + tipado estricto progresivo.
- Subir pruebas unitarias críticas y smoke e2e.
- Montar CI/CD básico + staging.
- Hardening de secretos y controles anti abuso en edge functions.

### Fase 2 (4–8 semanas): “Producto confiable de campus”
- Fortalecer social runtime (datos reales en foro, moderación básica, perfiles extendidos).
- Observabilidad completa y runbooks.
- Optimización de bundle y activos.

### Fase 3 (9–16 semanas): “Convergencia TAMV MD‑X4”
- Entregar L1/L2/L3/L4/L7 con módulos explícitos (`msr`, `bookpi`, `protocol`, `guardian`, `xr`, `quant-inspired`).
- Integrar economía/membresías/tokens y gobierno EOCT/Isabella en runtime.


---

## 7) Métricas de implementación para Lovable AI (tiempos estimados reales)

### Supuestos de cálculo

- Unidad de estimación: **hora efectiva Lovable AI + validación humana**.
- Rendimiento base:
  - Backend/migraciones: 18–28 LOC estables por hora.
  - Frontend integrado: 22–35 LOC por hora.
  - Refactor estricto + pruebas: 12–20 LOC por hora.
- Factor de corrección por complejidad sistémica TAMV: **1.35x**.
- Factor de incertidumbre por integración cross-layer (L1–L7): **+20%**.

### Fórmula usada

`Tiempo estimado final = (Horas base por módulo) * 1.35 * 1.20`

### Plan macro por paquetes de entrega

| Paquete | Alcance | Horas base | Horas ajustadas | Dependencias |
|---|---|---:|---:|---|
| P1 | Calidad release (lint/types/tests/CI básico) | 60 | 97.2 | Ninguna |
| P2 | Social runtime (canales, posts, comentarios, likes, DM + paginación) | 90 | 145.8 | P1 |
| P3 | Economía y membresías (wallet, ledger, tokens, cuotas) | 55 | 89.1 | P1 |
| P4 | Protocolos TAMV + MSR/BookPI + EOCT/Isabella | 120 | 194.4 | P1 |
| P5 | Guardian + XR adapter + DreamSpaces persistentes | 85 | 137.7 | P2, P4 |
| P6 | Streaming/video-call signaling + rooms | 70 | 113.4 | P2 |
| P7 | Hardening producción (observabilidad, seguridad, backups, runbooks) | 65 | 105.3 | P1..P6 |

**Total estimado:** 882.9 horas (≈ 22 semanas con 40 h/semana en un squad mixto IA+humano).  
**Con 2 squads paralelos:** ~11–13 semanas.

### Métrica de avance actual vs objetivo

- Avance validado hoy: **37%**.
- Brecha restante: **63 puntos porcentuales**.
- Velocidad objetivo para llegar a 85% en 12 semanas: **+4.0 a +4.5 pp/semana**.

---

## 8) Checklist operativo para implementación Lovable (con entregables de código)

## Sprint 1–2 (P1)
- [ ] Corregir 100% de errores de lint y `any` críticos.
- [ ] Activar strict real en TypeScript.
- [ ] Dejar mínimo 20 pruebas unitarias de dominios críticos.
- [ ] Pipeline CI: lint + test + build + preview deploy.

**DoD:** build estable sin errores, lint en verde, tests >= 20 con ejecución en CI.

## Sprint 3–4 (P2 + P3)
- [ ] Social DB: canales, posts, comments, likes, dm_threads, dm_messages.
- [ ] Paginación cursor-based para feeds y mensajes.
- [ ] Economy DB: wallets, ledger_internal, memberships, token_balances.
- [ ] API contracts para `/social/*` y `/economy/*`.

**DoD:** endpoints y consultas paginadas en producción interna, trazadas a MSR.

## Sprint 5–7 (P4)
- [ ] Integrar Protocol Engine + Lifecycle + Orchestrator.
- [ ] Conectar adaptadores MSR/BookPI.
- [ ] Integrar EOCT e Isabella en ruta de decisión.
- [ ] Registrar cada ejecución de protocolo en tablas auditables.

**DoD:** protocolo ejecutable end-to-end con evidencia MSR/BookPI.

## Sprint 8–9 (P5)
- [ ] Guardian activo con niveles de riesgo.
- [ ] Traducción a eventos XR (`protocol.visual.xr.ts`).
- [ ] DreamSpaces persistentes con permisos.

**DoD:** un flujo funcional de alerta Guardian visible en capa XR.

## Sprint 10–11 (P6)
- [ ] Señalización para videollamadas (rooms/participants/events).
- [ ] Integración streaming en canales.

**DoD:** rooms con conexión, presencia, permisos y trazabilidad.

## Sprint 12 (P7)
- [ ] Observabilidad + SLOs + alerting + backups + runbooks.
- [ ] Checklist final de despliegue productivo.

**DoD:** Go-Live checklist firmado por arquitectura, seguridad y operaciones.

---

## 9) Integraciones mínimas necesarias para Lovable

1. **Supabase**
   - Postgres + RLS + Realtime + Storage.
   - Edge Functions para orquestación protocolaria y servicios de dominio.
2. **Gateway IA**
   - Endpoint LLM para Isabella/EOCT asistido.
3. **Pagos**
   - Stripe para checkout/renewals de membresías.
4. **Realtime**
   - Canales para chat, presencia social y señalización de rooms.
5. **XR**
   - Adaptador declarativo (R3F/WebXR) y gateway de eventos Guardian.

---

## 10) Código funcional agregado en este ciclo (base de implementación)

- Núcleo de protocolos:
  - `src/core/tamv/protocol.types.ts`
  - `src/core/tamv/protocol.constitution.ts`
  - `src/core/tamv/protocol.lifecycle.ts`
  - `src/core/tamv/protocol.command.ts`
  - `src/core/tamv/protocol.engine.ts`
  - `src/core/tamv/protocol.orchestrator.ts`
  - `src/core/tamv/protocol.msr.adapter.ts`
  - `src/core/tamv/protocol.bookpi.adapter.ts`
- Memoria narrativa:
  - `src/core/tamv/msr.types.ts`
  - `src/core/tamv/msr.engine.ts`
  - `src/core/tamv/bookpi.ts`
- Guardianía y XR:
  - `src/core/tamv/protocol.monitoring.guardian.ts`
  - `src/core/tamv/protocol.visual.xr.ts`
  - `src/core/tamv/xr.gateway.ts`
  - `src/core/tamv/xr.renderer.adapter.ts`
  - `src/core/tamv/dreamspaces.service.ts`
- Identidad, usuarios, economía:
  - `src/core/tamv/idnvida.service.ts`
  - `src/core/tamv/user.service.ts`
  - `src/core/tamv/economy.service.ts`
  - `src/core/tamv/ledger.internal.ts`
  - `src/core/tamv/memberships.service.ts`
  - `src/core/tamv/tokens.service.ts`
- Ética y kernel:
  - `src/core/tamv/eoct.service.ts`
  - `src/core/tamv/isabella.kernel.ts`
- Social + paginación:
  - `src/core/pagination.ts`
  - `src/core/tamv/social.service.ts`

---

## 11) Base de datos y paginación (entregable para Lovable)

Se agrega migración de soporte federado para:
- MSR / BookPI.
- Protocol runs + steps.
- Guardian alerts.
- Social (channels/posts/comments/likes/dm).
- Economy (wallets/ledger/memberships/token balances).
- XR DreamSpaces + presencia.

Con RLS base y columnas preparadas para cursor-based pagination (`created_at`, índices compuestos).
