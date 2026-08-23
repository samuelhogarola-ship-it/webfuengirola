# Auditoria funcional del panel WF Studio

Fecha: 2026-08-23

## Resumen ejecutivo

El panel cubre las plataformas nombradas: WF-Studio, Vivir en Fuengirola, Conoce Fuengirola, Samuel Coach, Vokabel-World, Superentrenador y TodoPlastico. Esta ronda refuerza visibilidad, operativa, fallbacks ante integraciones externas, tests de regresion y documentacion.

## Hallazgos por prioridad

### P0 - Seguridad del cron de pendientes

`/api/pending-reminders` exige `PENDING_REMINDERS_CRON_SECRET` o `CRON_SECRET`, no admite secretos en URL y responde `503 cron_not_configured` si falta configuracion. Cada envio usa claim recuperable e idempotencia de Resend por pendiente/fecha para tolerar reintentos sin duplicar correos.

Evidencia: `src/app/api/pending-reminders/route.ts`, `src/lib/cron/pending-reminders.mjs`, `supabase/migrations/202608230002_pending_reminder_claims.sql`, `tests/pending-reminders.test.mjs`.

Responsable usuario: definir el secreto en produccion y confirmar que el proveedor de cron envia `Authorization: Bearer <secret>` o `x-cron-secret`.

### P1 - Plataformas sin panel operativo suficiente

Vivir y Conoce tienen dashboard por proyecto, clientes, suscripciones, alta/edicion de packs recurrentes, marcar pago y cerrar/activar.

Evidencia: rutas bajo `src/app/paneladmin/(protected)/vivir-en-fuengirola/`, `src/app/paneladmin/(protected)/conoce-fuengirola/`, `tests/panel-navigation.test.mjs`.

### P1 - Samuel Coach Premium inseguro

La gestion de codigos premium ya no usa Supabase desde navegador ni claves hardcodeadas. Ahora se ejecuta con server actions protegidas.

Evidencia: `src/app/paneladmin/(protected)/samuel-coach/premium/page.tsx`, `src/lib/actions/premium-codes.ts`, `tests/security.test.mjs`.

### P1 - Integraciones externas fragiles

Samuel Coach, Vokabel/imKontext y Superentrenador renderizan una tarjeta de conexion pendiente si falta una variable, tabla, permiso o RPC externa. El shell del panel no se cae.

Evidencia: `src/components/admin/connection-issue-card.tsx`, `tests/external-integrations.test.mjs`.

### P1 - Aislamiento de clientes y portal

La edicion queda limitada al proyecto de la pantalla. Vivir y Conoce gestionan clientes y suscripciones, pero no crean credenciales del portal WF, porque ese portal esta aislado a `wf-studio`. El cambio de email sincroniza Auth y revierte Auth si falla la escritura principal.

Evidencia: `src/components/admin/client-form.tsx`, `src/lib/actions/admin.ts`, `src/lib/data/admin.ts`, `tests/security.test.mjs`.

### P1 - Saldos y fallos silenciosos

`client_summary` descuenta solo actividad perteneciente a packs activos. Los loaders del panel y portal propagan errores de Supabase en lugar de mostrarlos como listas vacias, y las mutaciones solo revalidan tras confirmar la escritura.

Evidencia: `supabase/migrations/202608230001_client_summary_active_packs.sql`, `src/lib/data/admin.ts`, `src/lib/data/client.ts`, `src/lib/actions/`.

### P1 - TodoPlastico no era visible/operable desde WF

TodoPlastico aparece en dashboard, launcher y navegacion. Su panel incluye KPIs de usuarios, empresas y anuncios; filtros por estado; acciones de verificar/bloquear/activar empresa; y aprobar/rechazar anuncios pendientes.

Evidencia: `src/app/paneladmin/(protected)/todoplastico/page.tsx`, `src/lib/actions/todoplastico.ts`, `src/lib/data/todoplastico.ts`.

### P2 - Usuarios y estadisticas educativas

Vokabel-World tiene panel de usuarios y estadisticas por app: total, confirmados, sin confirmar, activos en 30 dias, apps conectadas, membresias y busqueda. Auth se pagina completo y la busqueda no altera los KPI.

Evidencia: `src/app/paneladmin/(protected)/vokabel-world/usuarios/page.tsx`, `src/lib/data/apps-users.ts`.

### P2 - Superentrenador necesita Umami

WF Studio no modifica el repo externo. El panel incluye instruccion visible y el runbook documenta los cambios necesarios en Superentrenador.

Evidencia: `src/app/paneladmin/(protected)/superentrenador/pt/page.tsx`, `ADMIN_PANEL_OPERATIONS.md`.

## Estado por plataforma

| Plataforma          | Estado actual                        | Funciones cubiertas                                                        | Queda fuera / accion usuario                                                |
| ------------------- | ------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| WF-Studio           | Completa para v1                     | Clientes, horas, actividades, servicios, facturas, informes, panel cliente | Aplicar migraciones y revisar email/DNS                                     |
| Vivir en Fuengirola | Operativa                            | Dashboard, clientes, suscripciones, cobros, altas                          | Validar planes reales y textos comerciales                                  |
| Conoce Fuengirola   | Operativa                            | Dashboard, clientes, suscripciones, cobros, altas                          | Validar planes reales y textos comerciales                                  |
| Samuel Coach        | Operativa con dependencias externas  | Textos, ejercicios, alumnos, progreso, premium                             | Mantener RPC premium y datos en Apps Users/imKontext                        |
| Vokabel-World       | Operativa para usuarios/estadisticas | Vokabel-Lab, imKontext, Der Die Das, usuarios                              | Definir futuras acciones editoriales si se quieren modificar datos desde WF |
| Superentrenador     | Operativa como consola + moderacion  | Entrenadores, usuarios, accesos externos, instruccion Umami                | Implementar Umami en repo externo                                           |
| TodoPlastico        | Operativa para moderacion            | Empresas, usuarios KPI, anuncios, filtros, acciones y paginacion           | Confirmar URL/admin externa y permisos service role                         |
| Proyectos           | No tocado por instruccion            | Ruta sigue existente                                                       | Se deja intacto                                                             |

## Contratos de entorno

| Integracion     | Variables                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Core WF         | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `APP_URL`, `NEXT_PUBLIC_APP_URL` |
| Contacto        | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`                             |
| Cron pendientes | `CRON_SECRET` o `PENDING_REMINDERS_CRON_SECRET`                                                                             |
| TodoPlastico    | `TODO_PLASTICO_URL`, `TODO_PLASTICO_SERVICE_KEY`, `TODO_PLASTICO_ADMIN_URL`                                                 |
| Superentrenador | `SUPERENTRENADOR_URL`, `SUPERENTRENADOR_SERVICE_KEY`, `NEXT_PUBLIC_SUPERENTRENADOR_URL`, `NEXT_PUBLIC_COACH_STUDIO_URL`     |
| Apps educativas | `APPS_USERS_URL`, `APPS_USERS_SERVICE_KEY`, `IMKONTEXT_URL`, `IMKONTEXT_SERVICE_KEY`                                        |

## Gates de verificacion

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Tests relevantes:

- `tests/security.test.mjs`: auth, redirects, cron y premium seguro.
- `tests/pending-reminders.test.mjs`: autorizacion, persistencia y telemetria del cron.
- `tests/panel-navigation.test.mjs`: rutas visibles para todas las plataformas y acciones principales.
- `tests/external-integrations.test.mjs`: fallbacks de integraciones externas.

## Decision tomada

No se toca codigo de otros proyectos desde este repo. Cuando el cambio pertenece a Superentrenador, TodoPlastico o apps educativas, WF Studio consume APIs/DB con service role y documenta instrucciones externas.
