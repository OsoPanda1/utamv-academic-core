# Auditoría integral UTAMV (seguridad + anti-fraude + benchmark) — 2026-05-03

## 1) Veredicto ejecutivo
No existe seguridad 100% absoluta contra robo de contenido/ideas en Internet; lo correcto es una **arquitectura de defensa en profundidad** con controles técnicos, legales y operativos.

Prioridades críticas para UTAMV:
1. Endurecer control de acceso de cursos (backend-first, no solo frontend).
2. Blindar distribución de video/documentos con URLs firmadas de corta vida + watermark forense por usuario.
3. Endurecer pagos/identidad/certificación con antifraude y trazabilidad de riesgo.
4. Aumentar seguridad de app (CSP, headers, rate limits, auditoría y detección).

## 2) Hallazgos de arquitectura actual
- El frontend ya muestra estado de inscripción, pero la protección de acceso debe vivir en políticas RLS y/o funciones backend para evitar bypass por cliente modificado.
- Se detectó necesidad de reforzar bloqueo funcional de lecciones premium en el visor de curso (aplicado en este commit).

## 3) Mejores prácticas observadas (universidades y plataformas líderes)

### Universidades online de referencia (2026)
- **University of Florida Online**: reporta liderazgo en rankings de programas online 2026 y enfoque en soporte integral al estudiante.
- **Penn State World Campus**: enfoque fuerte en escalabilidad y oferta completa de grados.
- **Oregon State Ecampus / UMass / CUNY SPS / UC / UNF**: alta madurez en servicios remotos, soporte y consistencia académica.

### Plataformas líderes de cursos
- **Coursera** (programas con universidades, rutas certificables, UX académica modular).
- **edX** (estructura por trayectorias, rigor universitario, microcredenciales).
- **Udemy** (catálogo masivo, descubrimiento y conversión comercial).
- **MasterClass** (alto estándar visual y narrativa premium).

## 4) Estructura/paginación objetivo “UTAMV Superior”
### Arquitectura de información unificada
- Home (propuesta de valor + prueba social + CTA dual: explorar/comenzar).
- Catálogo (filtros facetados: área, nivel, duración, precio, idioma, modalidad).
- Página de programa (temario, outcomes, instructor, demo, FAQ, pricing).
- Checkout (1 pantalla, confianza, upsell de membresía, garantías claras).
- Campus (dashboard progreso, calendario, certificaciones, comunidad).
- Lección (player + notas + recursos + discusión + progreso + evaluación).

### Paginación y navegación
- Listado por cursor/infinite-scroll híbrido para catálogo grande.
- URLs limpias por `slug`, breadcrumbs, canonical tags y schema.org.
- Redireccionamientos 301 para slugs históricos y recuperación de tráfico.

## 5) Plan de seguridad y antifraude (implementación por fases)

### Fase 1 (0-30 días)
- RLS estricta en `lessons`, `course_modules`, `course_assets` por matrícula/compra.
- Entrega de media vía Signed URLs (60-180s) desde Edge Function.
- Rate limit por IP+usuario en login, checkout, certificados, webhooks.
- CSP estricta + `X-Frame-Options` + `Referrer-Policy` + `Permissions-Policy`.
- SIEM básico: logs de autenticación, acceso a lecciones, pagos, certificados.

### Fase 2 (30-60 días)
- Watermark dinámico (email/hash/fecha) en video/PDF para trazabilidad forense.
- Motor de riesgo antifraude (device fingerprint, velocity checks, geo-anomalías).
- Detección de abuso (compartición de cuenta, concurrencia imposible, scraping).
- Certificados con verificación pública + firma criptográfica + revocación.

### Fase 3 (60-90 días)
- Zero Trust total (segregación por servicio/rol/entorno + secretos rotables).
- DLP para contenido sensible y snapshots de evidencia legal.
- Programa formal de AppSec: SAST, DAST, dependencia, pentest externo.

## 6) KPIs de seguridad
- % intentos bloqueados por controles antifraude.
- MTTR de incidentes.
- Tasa de fugas detectadas con atribución forense.
- Chargeback rate y fraude de certificados.

## 7) Fuentes consultadas (benchmark externo)
- U.S. News 2026 Best Online Programs (comunicado):
  https://www.prnewswire.com/news-releases/us-news--world-report-reveals-2026-best-online-programs-rankings-302670579.html
- UF Online ranking 2026:
  https://ufonline.ufl.edu/news-and-updates/2026-usnwr-rankings/
- Penn State World Campus 2026 rankings:
  https://www.psu.edu/news/world-campus/story/penn-state-featured-us-news-2026-best-online-programs-rankings
- QS Online MBA 2026 overview:
  https://www.qs.com/en-us/insights/qs-global-mba-business-masters-and-online-mba-ranking-results
- TechRadar 2026 online learning platforms (referencia de mercado):
  https://www.techradar.com/best/best-online-learning-platforms

