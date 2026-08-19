# Panel WF Studio - Operaciones pendientes fuera de este repo

## P0 cron de pendientes

El endpoint `/api/pending-reminders` envia recordatorios automaticos de datos pendientes a clientes. Ahora exige `PENDING_REMINDERS_CRON_SECRET` o `CRON_SECRET`; si no existe, responde `503 cron_not_configured`.

Accion necesaria en despliegue:

- En Vercel, definir `CRON_SECRET`; Vercel lo envia automaticamente como `Authorization: Bearer <secret>` en cron jobs.
- En otro proveedor, definir `PENDING_REMINDERS_CRON_SECRET` y configurar la llamada con `Authorization: Bearer <secret>` o cabecera `x-cron-secret: <secret>`.
- Verificar en logs que `/api/pending-reminders` responde `200` cuando hay secreto y `401/503` cuando falta o no coincide.

## Superentrenador - Umami

No se modifica desde WF Studio porque pertenece a otro proyecto. Instrucciones para el repo de Superentrenador:

- Instalar el script de Umami en el layout publico.
- Incluirlo tambien en marketplace, panel entrenador y panel alumno si usan layouts separados.
- Crear/configurar el website id especifico de Superentrenador.
- Verificar eventos basicos por ruta: landing, busqueda, ficha de entrenador, registro/login, panel entrenador y panel alumno.
- Exponer las metricas agregadas que quiera leer WF Studio solo mediante API segura o tabla/view con service key, nunca con claves publicas administrativas.

## Apps educativas - usuarios y premium

WF Studio usa `APPS_USERS_URL` y `APPS_USERS_SERVICE_KEY` para leer usuarios compartidos, membresias y codigos premium.

Accion necesaria si una app nueva se suma al ecosistema:

- Registrar su valor en `app_memberships.app`.
- Mantener las RPC `list_premium_codes`, `generate_premium_code` y `cancel_premium_code` disponibles para el panel.

## Checklist rapido antes de desplegar

- Ejecutar `npm run lint`.
- Ejecutar `npm run typecheck`.
- Ejecutar `npm test`.
- Ejecutar `npm run build`.
- Revisar `ADMIN_PANEL_AUDIT.md`.
- Confirmar que `Proyectos` no tiene cambios funcionales si sigue fuera de alcance.
