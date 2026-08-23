# WIP resume - panel hardening

Fecha de cierre tecnico: 2026-08-23

## Completado

- Expansion funcional y navegacion de todos los paneles solicitados.
- Migracion `202608190001_client_auth_identity.sql` para vincular clientes con Auth mediante `auth_user_id` y aislar el portal en `wf-studio`.
- Registro publico, alta directa y sincronizacion de email actualizados para usar `auth_user_id`.
- Utilidades ejecutables para propagar errores Supabase, paginar todos los usuarios Auth y calcular estadisticas por app.
- Pruebas focalizadas verdes:
  - `node --test tests/security.test.mjs tests/migrations.test.mjs tests/register.test.mjs`: 17/17.
  - `node --test tests/integration-utils.test.mjs`: 4/4.

## Estado actual

El tipado de integraciones, propagacion de errores, aislamiento por proyecto, estadisticas educativas, cron y paginacion estan terminados. Tambien se corrigio `client_summary` para no descontar actividad de packs cerrados.

## Siguiente orden recomendado

1. Aplicar en Supabase `202608190001_client_auth_identity.sql`, `202608230001_client_summary_active_packs.sql` y `202608230002_pending_reminder_claims.sql`.
2. Configurar secretos y service keys descritos en `.env.example` y `ADMIN_PANEL_OPERATIONS.md`.
3. Implementar Umami en el repo externo de Superentrenador siguiendo el runbook.
4. Hacer smoke test autenticado con datos reales tras desplegar.

## Verificacion

- `npm test`: 37/37.
- `npm run lint`: correcto.
- `npm run typecheck`: correcto.
- `npm run build`: correcto.
- HTTP local: `/paneladmin` y `/cliente` responden 200; cron sin secreto responde 503.

Los directorios `graphify-out/` son artefactos auxiliares generados y no forman parte del commit WIP.
