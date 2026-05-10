# TAMV MD‑X4 — Plan Integrado (Modo Desarrollador)

## Propósito
Este plan convierte las directrices de arquitectura TAMV en entregables ejecutables para el repositorio actual, sin romper compatibilidad y siguiendo la regla **No borrar; integrar y extender**.

## Principios operativos
- Do-No-Harm, transparencia, trazabilidad y auditabilidad por diseño.
- Separación federada por capas (L0-L7) en contratos, servicios y visualización.
- Integración obligatoria con memoria narrativa (MSR + BookPI) en acciones críticas.
- Diseño civil-first: UX comprensible para usuarios no técnicos.

## Matriz de capas (L0-L7) con estado objetivo

### L0 — Doctrina & Ética
**Objetivo:** consolidar constitución técnica/ética versionada y verificable.
- Fuente principal: `protocol.constitution.ts`.
- Entregables:
  1. Catálogo de reglas éticas aplicables por dominio (social, economía, protocolos, XR).
  2. `constitutionVersion` obligatorio en eventos críticos.

### L1 — Memoria & Registro
**Objetivo:** todo evento sensible debe registrar huella en MSR y narrativa en BookPI.
- Fuentes: `msr.engine.ts`, `msr.types.ts`, `bookpi.ts`, `protocol.*.adapter.ts`.
- Entregables:
  1. Plantilla de evento unificada (`traceId`, `actorId`, `riskLevel`, `domain`, `narrativeRef`).
  2. Policy: sin persistencia crítica sin `msr.record` + `bookpi.append` (si aplica).

### L2 — Protocolos Controlados
**Objetivo:** orquestación completa con lifecycle + engine + command + orchestrator.
- Fuentes: `protocol.engine.ts`, `protocol.lifecycle.ts`, `protocol.command.ts`, `protocol.orchestrator.ts`.
- Entregables:
  1. Pipeline de evaluación ética (Constitución + EOCT) antes de ejecución.
  2. Salida estructurada para guardianía y XR (`protocolOutcome`).

### L3 — Guardianía & Monitoreo
**Objetivo:** estado observable del sistema con alertas accionables.
- Fuente: `protocol.monitoring.guardian.ts`.
- Entregables:
  1. FSM explícita de severidad (green/amber/red/critical).
  2. Contratos de eventos para dashboards y capa XR.

### L4 — XR / VR / 3D / 4D
**Objetivo:** traducción visual viva de protocolos y guardianía.
- Fuentes: `protocol.visual.xr.ts`, `xr.gateway.ts`, `xr.renderer.adapter.ts`, `dreamspaces.service.ts`.
- Entregables:
  1. `XRHyperRealScene` con binding declarativo de eventos Guardian/Protocol.
  2. DreamSpaces persistentes con permisos y presencia social.

### L5 — Servicios de Dominio
**Objetivo:** identidad, usuarios, social y economía interoperables.
- Fuentes: `idnvida.service.ts`, `user.service.ts`, `social.service.ts`, `economy.service.ts`, `ledger.internal.ts`, `memberships.service.ts`, `tokens.service.ts`.
- Entregables:
  1. Matriz de permisos por membresía (`free`, `creator`, `guardian`, `institutional`).
  2. Ledger interno para toda transacción de créditos/membresías.

### L6 — Shell UX & Integración
**Objetivo:** rutas web/API y flujos end-to-end usables.
- Entregables:
  1. Contratos para `/auth`, `/users`, `/profiles`, `/social/*`, `/streams`, `/protocols`, `/economy`, `/xr`.
  2. Flujos mínimos: onboarding, perfil, publicación, ingreso a DreamSpace, membresía.

### L7 — Quantum-Inspired
**Objetivo:** orquestación multi-ruta con colapso ético-informado.
- Entregables:
  1. Abstracción de problema (`objective`, `constraints`, `ethicsGuards`).
  2. Resolver clásico enchufable con interfaz para backends híbridos futuros.

## Backlog de implementación por sprints

## Sprint 1 — Trazabilidad transversal
1. Normalizar `traceId` y metadatos de auditoría en protocolos/economía/social.
2. Publicar adaptadores MSR/BookPI como requisito de dominio crítico.
3. Añadir tests de contrato de auditoría.

## Sprint 2 — Protocolos + Guardian
1. Endurecer `protocol.orchestrator.ts` para ruta completa: command -> constitution -> EOCT -> execute -> MSR/BookPI -> guardian.
2. Estabilizar clasificación de riesgo Guardian.
3. Añadir snapshots de eventos para XR.

## Sprint 3 — XR & DreamSpaces
1. Consolidar `xr.gateway.ts` para SSE/WS resiliente.
2. Declarar mapeos evento->escena en `protocol.visual.xr.ts`.
3. Permisos DreamSpaces ligados a membresía + rol.

## Sprint 4 — Economía + Membresías
1. Completar flujos de créditos de uso y contribución en `ledger.internal.ts`.
2. Reglas de cuota y capacidad por membresía.
3. Registro MSR/BookPI para operaciones de alto impacto.

## Sprint 5 — Social civilizatorio
1. Consolidar canales, grupos, DM y publicaciones multimedia.
2. Integrar señalización para video-calls/streams con control de permisos.
3. Moderación ética basada en Constitución + EOCT.

## Criterios de aceptación (Definition of Done)
- No hay acción crítica sin trazabilidad (`traceId`) y rastro en memoria.
- Toda decisión de protocolo pasa por validación ética previa.
- Guardian emite estado observable y XR lo representa en tiempo real.
- Economía y membresías afectan permisos reales de UX/servicio.
- Tests TAMV verdes en engine, lifecycle, guardian, XR, economy e identidad.

## Mapa de pruebas obligatorias
- `src/test/tamv/protocol.engine.test.ts`
- `src/test/tamv/protocol.lifecycle.test.ts`
- `src/test/tamv/protocol.orchestrator.test.ts`
- `src/test/tamv/guardian.xr.test.ts`
- `src/test/tamv/economy.service.test.ts`
- `src/test/tamv/idnvida.service.test.ts`

## Riesgos y mitigaciones
- **Acoplamiento entre capas:** reforzar interfaces y adaptadores.
- **Complejidad XR temprana:** priorizar contratos de eventos antes de fidelidad visual.
- **Deuda de trazabilidad:** bloqueo de merge si faltan campos de auditoría.

## Política de cambios
- No eliminar módulos existentes.
- Cambios incrementales y compatibles (campos nuevos opcionales primero).
- Mantener límites de responsabilidad por capa.
