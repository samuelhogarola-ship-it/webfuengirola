# Panel WF Studio - Operaciones pendientes fuera de este repo

## P0 cron de pendientes

El endpoint `/api/pending-reminders` exige `PENDING_REMINDERS_CRON_SECRET` o `CRON_SECRET`; sin secreto responde `503 cron_not_configured`.

- En Vercel, definir `CRON_SECRET`; Vercel lo envia como `Authorization: Bearer <secret>`.
- En otro proveedor, usar `PENDING_REMINDERS_CRON_SECRET` y `Authorization` o `x-cron-secret`.
- No incluir `?secret=`: el endpoint no lo acepta y las URLs suelen quedar en logs.
- Alertar cuando `ok` sea `false` o `failed` no este vacio. Cada fallo indica `id`, fase `claim|send|persist|release` y mensaje.
- Mantener Resend como proveedor del cron o conservar una clave de idempotencia equivalente si se cambia de proveedor.

## Informes estadísticos mensuales

El endpoint `/api/monthly-stat-reports` exige `MONTHLY_STAT_REPORTS_CRON_SECRET` o `CRON_SECRET`; sin secreto responde `503 cron_not_configured`.

- En Vercel, `vercel.json` lo programa el día 1 de cada mes a las 09:00.
- En Coolify u otro cron externo, programar una llamada mensual con `Authorization: Bearer <secret>` o `x-cron-secret`.
- Variables mínimas: `STAT_REPORT_UMAMI_URL`, `STAT_REPORT_UMAMI_PASSWORD`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.
- Variables recomendadas: `STAT_REPORT_EMAIL_TO`, `STAT_REPORT_STORAGE_DIR` y `STAT_REPORT_UMAMI_WEBSITE_ID_*` si el sitio no se puede resolver por dominio en Umami.
- El informe se guarda como Markdown en `storage/stat-reports/YYYY-MM.md` salvo que `STAT_REPORT_STORAGE_DIR` apunte a otra carpeta.
- Cada email usa idempotencia mensual: `monthly-stat-report-YYYY-MM`.

## Superentrenador - Umami

Ejecutar en el repo de Superentrenador, no en WF Studio:

- Crear un website en Umami y guardar su id en `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- Guardar el script en `NEXT_PUBLIC_UMAMI_SCRIPT_URL`, por ejemplo `https://analytics.example.com/script.js`.
- Insertar en el layout raiz un script `defer` con esa URL y `data-website-id`. Repetirlo en marketplace, panel entrenador o panel alumno si no heredan ese layout.
- Autorizar el host de Umami en `script-src` y `connect-src` si existe CSP.
- Verificar que el script carga con 200 y envia eventos sin emails, nombres ni datos personales.
- Medir rutas y eventos `trainer_search`, `trainer_profile_view`, `signup_started`, `signup_completed`, `trainer_contact_started` y `subscription_started`.
- Exponer a WF Studio solo metricas agregadas mediante API segura o vista con service key.

## Apps educativas

- Registrar cada app en `app_memberships.app`.
- Mantener `list_premium_codes`, `generate_premium_code` y `cancel_premium_code`.
- Añadir un campo/parametro `app` a esas RPC antes de presentar los codigos como exclusivos de Samuel Coach; mientras no exista, WF los rotula como premium educativo compartido.
- Confirmar acceso service role a perfiles, membresias, progreso e intentos.

## TodoPlastico

- Definir `TODO_PLASTICO_URL`, `TODO_PLASTICO_SERVICE_KEY` y `TODO_PLASTICO_ADMIN_URL`.
- Mantener accesibles `mkt_companies`, `mkt_listings` y Auth Admin para service role.
- Confirmar empresas `active|blocked` y anuncios `pending_review|published|rejected`.
- No exponer la service key al navegador.

## Checklist

- Aplicar las migraciones `202608190001_client_auth_identity.sql`, `202608230001_client_summary_active_packs.sql` y `202608230002_pending_reminder_claims.sql`.
- Ejecutar `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`.
- Confirmar que `Proyectos` sigue sin cambios funcionales.
