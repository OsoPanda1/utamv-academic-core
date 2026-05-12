# Contribuir a UTAMV Academic Core

Gracias por contribuir al núcleo académico de UTAMV.

## Flujo de trabajo
1. Crea una rama desde `main` usando prefijos:
   - `feat/<federacion>-<tema>`
   - `fix/<federacion>-<tema>`
   - `docs/<tema>`
2. Mantén cambios acotados por federación y objetivo.
3. Ejecuta validaciones locales antes de abrir PR.
4. Abre PR con plantilla y evidencia de pruebas.

## Mapeo de federaciones (operativo)
- **Académica**: `src/pages`, `src/components`, reglas curriculares en `supabase/migrations`.
- **Datos**: `supabase/migrations`, `supabase/config.toml`.
- **IA**: `supabase/functions/utamv-ai-tutor`, `supabase/functions/isabella-kernel`.
- **Seguridad**: políticas SQL/RLS en migraciones, webhooks y funciones de pago.
- **Infraestructura**: `infra/k8s` y configuración de despliegue.

## Estándar de dependencias
- Gestor oficial: **npm**.
- Lockfile canónico: `package-lock.json`.
- No introducir lockfiles alternos en nuevos commits.

## Checklist mínimo para PR
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] Si cambias SQL/RLS: documenta impacto de seguridad y datos.
- [ ] Si cambias UX académica: incluye nota de impacto pedagógico.

## Convenciones de commit
Usar Conventional Commits:
- `feat:` nueva funcionalidad
- `fix:` corrección
- `docs:` documentación
- `refactor:` refactor sin cambio funcional
- `test:` pruebas

## Issues y PR
Incluye siempre:
- Federación principal afectada.
- Riesgos de privacidad/seguridad.
- Plan de rollback (si aplica).
