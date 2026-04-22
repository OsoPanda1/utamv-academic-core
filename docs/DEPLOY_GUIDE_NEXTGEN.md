# MANUAL DE DESPLIEGUE — UTAMV NextGen 2026

> Runbook ceremonial para llevar UTAMV Campus Online de pre-producción a
> producción pública con confianza institucional.

---

## 1. Pre-flight checklist

Antes de cualquier despliegue mayor, verificar:

- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run test` con cobertura ≥ 60 % en flujos críticos.
- [ ] `npm run build` produce bundle < 500 kB inicial.
- [ ] Todas las migraciones aplicadas en orden.
- [ ] Secrets configurados: `LOVABLE_API_KEY`, `STRIPE_SECRET_KEY`,
      `ELEVENLABS_API_KEY` (con scope `text_to_speech`).
- [ ] HIBP password protection activo.
- [ ] Bucket `lessons-media` y `certificates` con políticas RLS verificadas.

## 2. Despliegue de contenido multimedia

### 2.1. Videos temáticos
Los 5 videos cinematográficos del Diplomado se almacenan en
`lessons-media/videos/`. Para regenerar uno:

```bash
# Generar con imagen IA (ejemplo conceptual)
# La asignación a lecciones se hace vía migración SQL mapeando module_id.
```

### 2.2. Narraciones ElevenLabs
```bash
# Invocar batch para todas las lecciones del Diplomado
curl -X POST \
  https://wjcgihlaauyztgovjeji.supabase.co/functions/v1/generate-lesson-narration \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"batchAll":true,"courseSlug":"diplomado-ecosistemas-digitales"}'
```

Respuesta esperada: `{ ok: true, processed: 40, results: [...] }`.

## 3. Verificación end-to-end

### 3.1. Flujo estudiante
1. Registro en `/auth/register`.
2. Inscripción al Diplomado en `/campus`.
3. Apertura de `/campus/curso/diplomado-ecosistemas-digitales`.
4. Reproducción de lección con `MediaPlayer` (video + audio + transcripción).
5. Marcado de lección como completada → otorgar badge `first_step`.
6. Completar 100 % → emisión de certificado en BlockUTAMV.

### 3.2. Flujo administrador
1. Login con cuenta admin.
2. Acceso a `/admin/control-escolar`: ver inscripciones, cambiar estado a
   `graduated`, emitir certificados.
3. Acceso a `/admin/telemetria-isabella`: monitorear ECG kernel, nodos
   federados, stream emocional TAMVCRUMS.

### 3.3. Verificación pública
1. Cualquier visitante puede acceder a `/ranking` y ver el leaderboard.
2. `/verificar/<certNumber>` valida certificados con QR + hash BlockUTAMV.

## 4. Despliegue ceremonial

1. **Anuncio interno** — comunicar a stakeholders 48 h antes.
2. **Snapshot DB** — backup completo antes de migraciones.
3. **Publicación** — usar el botón Publish de Lovable.
4. **Verificación post-deploy** — ejecutar checklist 3.1–3.3.
5. **Documentación** — actualizar `AUDITORIA_PRODUCCION_<fecha>.md`.
6. **Acta ceremonial** — registrar el despliegue como evento institucional en
   `tamv_kernel_events` con tipo `deploy.ceremonial`.

## 5. Rollback

Si algo falla:
1. Restaurar versión anterior desde el historial de Lovable.
2. Reverter migraciones problemáticas (cada migración es transaccional).
3. Notificar a usuarios vía toast global o banner institucional.

## 6. Contacto operativo

- Soporte técnico: equipo Lovable Cloud.
- Soporte institucional: rectoría UTAMV.
- Soporte federado TAMV/RDM: nodo Isabella.

---

> Cada despliegue es un acto histórico. Documenta, celebra, mejora.
