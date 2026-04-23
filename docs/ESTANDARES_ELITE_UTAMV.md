# ESTÁNDARES ELITE UTAMV — NextGen 2026

> Manual de estilo, código y experiencia para todo desarrollo dentro del
> ecosistema UTAMV Campus Online.

---

## 1. Identidad visual

### 1.1. Paleta semántica
- Toda referencia a color **debe** usar tokens HSL definidos en `index.css` y
  `tailwind.config.ts`.
- Tokens autorizados: `--background`, `--foreground`, `--platinum`,
  `--platinum-dim`, `--primary`, `--secondary`, `--accent`, `--muted`,
  `--destructive`.
- **Prohibido**: `text-white`, `bg-black`, `text-[#xxx]` directos.

### 1.2. Tipografía
- Display: `font-display` (Cormorant Garamond / Playfair).
- UI: `font-ui` (Inter / IBM Plex Sans).
- Cuerpo extendido: prosa con `prose-invert prose-sm`.

### 1.3. Fondos elite
- Toda página institucional debe envolver su contenido con
  `<EliteBackground variant="navy|petrol|platinum" />`.
- Layout estándar: `relative min-h-screen overflow-hidden` + `relative z-10`.

### 1.4. Componentes shadcn
- Variantes personalizadas vía `cva`. Nunca colores inline.
- Cards institucionales: `bg-[hsl(222_38%_5%)]/80 backdrop-blur border-platinum/10`.

## 2. Arquitectura código

### 2.1. Estructura
- `src/pages` — rutas top-level únicamente.
- `src/components` — UI reutilizable.
- `src/core/tamv` — núcleo federado L0–L7.
- `supabase/functions` — edge functions Deno; un index.ts por función.

### 2.2. Convenciones
- TypeScript estricto progresivo. `any` sólo justificado.
- Hooks personalizados con prefijo `use`.
- Testing con Vitest. Mock Supabase para flujos críticos.

### 2.3. Edge Functions
- CORS obligatorio en todas las respuestas.
- Validación Zod o equivalente en inputs.
- Secrets vía `Deno.env.get(...)`. Nunca hard-coded.
- Errores tipados retornan HTTP correcto (400/401/403/500).

## 3. Seguridad

### 3.1. Autenticación
- Sólo email/password + Google. Sin sign-ups anónimos.
- HIBP password protection **siempre activo**.
- MFA recomendado para roles admin.

### 3.2. RLS
- Toda tabla con datos de usuario debe tener RLS habilitada.
- Políticas usan `auth.uid()` o `public.has_role(auth.uid(), 'rol')`.
- Roles se almacenan **exclusivamente** en `user_roles` (nunca en `profiles`).

### 3.3. Storage
- Buckets públicos sólo para distribución de contenido (videos, certificados).
- Buckets privados con políticas por usuario via `storage.foldername(name)[1]`.

## 4. Experiencia de usuario

### 4.1. Microinteracciones
- Botones primarios siempre con feedback (toast, loading state).
- Transiciones suaves (`transition-colors duration-200`).
- Loading states con skeleton o spinner personalizado.

### 4.2. Accesibilidad
- Contraste AA mínimo en modo dark.
- Alt text en imágenes.
- Roles ARIA en componentes interactivos custom.
- Focus visible en navegación por teclado.

### 4.3. Performance
- Lazy loading de imágenes pesadas.
- Code splitting por ruta.
- Bundle target < 500 kB inicial.

## 5. Documentación ceremonial

Todo despliegue mayor genera tres artefactos obligatorios:
1. `AUDITORIA_PRODUCCION_<fecha>.md` — scoring + brechas.
2. `DEPLOY_GUIDE_NEXTGEN.md` — runbook actualizado.
3. Nota oficial en `mem://` con cambios de identidad o reglas.

## 6. Compromiso institucional

> "Cada línea de código en UTAMV es un acto de soberanía digital territorial."

Toda contribución se evalúa contra estos estándares antes de merge.
