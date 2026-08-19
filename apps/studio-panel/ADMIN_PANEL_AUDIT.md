# Auditoria funcional del panel WF Studio

Fecha: 2026-08-19

## Resumen ejecutivo

El panel cubre las plataformas nombradas: WF-Studio, Vivir en Fuengirola, Conoce Fuengirola, Samuel Coach, Vokabel-World, Superentrenador y TodoPlastico. Esta ronda refuerza visibilidad, operativa, fallbacks ante integraciones externas, tests de regresion y documentacion.

## Hallazgos por prioridad

### P0 - Seguridad del cron de pendientes

`/api/pending-reminders` envia recordatorios automaticos de pendientes de clientes. Ahora exige `PENDING_REMINDERS_CRON_SECRET` o `CRON_SECRET` y responde `503 cron_not_configured` si falta configuracion.

Evidencia: `src/app/api/pending-reminders/route.ts`, `tests/security.test.mjs`.

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

### P1 - TodoPlastico no era visible/operable desde WF

TodoPlastico aparece en dashboard, launcher y navegacion. Su panel incluye KPIs de usuarios, empresas y anuncios; filtros por estado; acciones de verificar/bloquear/activar empresa; y aprobar/rechazar anuncios pendientes.

Evidencia: `src/app/paneladmin/(protected)/todoplastico/page.tsx`, `src/lib/actions/todoplastico.ts`, `src/lib/data/todoplastico.ts`.

### P2 - Usuarios y estadisticas educativas

Vokabel-World tiene panel de usuarios y estadisticas compartidas: total, confirmados, sin confirmar, actividad, apps conectadas, membresias y busqueda.

Evidencia: `src/app/paneladmin/(protected)/vokabel-world/usuarios/page.tsx`, `src/lib/data/apps-users.ts`.

### P2 - Superentrenador necesita Umami

WF Studio no modifica el repo externo. El panel incluye instruccion visible y el runbook documenta los cambios necesarios en Superentrenador.

Evidencia: `src/app/paneladmin/(protected)/superentrenador/pt/page.tsx`, `ADMIN_PANEL_OPERATIONS.md`.

## Estado por plataforma

| Plataforma          | Estado actual                        | Funciones cubiertas                                                        | Queda fuera / accion usuario                                                |
| ------------------- | ------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| WF-Studio           | Completa para v1                     | Clientes, horas, actividades, servicios, facturas, informes, panel cliente | Revisar datos reales y email/DNS                                            |
| Vivir en Fuengirola | Operativa                            | Dashboard, clientes, suscripciones, cobros, altas                          | Validar planes reales y textos comerciales                                  |
| Conoce Fuengirola   | Operativa                            | Dashboard, clientes, suscripciones, cobros, altas                          | Validar planes reales y textos comerciales                                  |
| Samuel Coach        | Operativa con dependencias externas  | Textos, ejercicios, alumnos, progreso, premium                             | Mantener RPC premium y datos en Apps Users/imKontext                        |
| Vokabel-World       | Operativa para usuarios/estadisticas | Vokabel-Lab, imKontext, Der Die Das, usuarios                              | Definir futuras acciones editoriales si se quieren modificar datos desde WF |
| Superentrenador     | Operativa como consola + moderacion  | Entrenadores, usuarios, accesos externos, instruccion Umami                | Implementar Umami en repo externo                                           |
| TodoPlastico        | Operativa para moderacion            | Empresas, usuarios KPI, anuncios, filtros, acciones                        | Confirmar URL/admin externa y permisos service role                         |
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
- `tests/panel-navigation.test.mjs`: rutas visibles para todas las plataformas y acciones principales.
- `tests/external-integrations.test.mjs`: fallbacks de integraciones externas.

## Decision tomada

No se toca codigo de otros proyectos desde este repo. Cuando el cambio pertenece a Superentrenador, TodoPlastico o apps educativas, WF Studio consume APIs/DB con service role y documenta instrucciones externas.
