# UTAMV Academic Core

Plataforma académica UTAMV con React + Vite + Supabase.

## Mejoras 2026.05
- Seguridad reforzada en registro/login (contraseñas robustas, sanitización de entradas).
- Perfil de usuario listo para edición dentro del campus.
- Activación de notificaciones del navegador y alerta sonora al habilitarlas.
- Auditoría automática de cursos para detectar contenido incompleto por módulo/lecciones/evaluaciones.
- Planes de pago Starter, Professional y Elite.

## Producción y despliegue
1. Configurar variables de entorno Supabase y Stripe.
2. Ejecutar migraciones SQL en `supabase/migrations`.
3. Build: `npm run build`.
4. Verificación: `npm run test`.
5. Desplegar frontend (Vercel/Netlify) y edge functions de Supabase.

## Seguridad mínima recomendada
- Habilitar MFA en Supabase Auth.
- Activar rate limit en edge functions críticas (`create-subscription`, `stripe-webhook`).
- Configurar WAF/CDN y cabeceras CSP/STS en el host.
