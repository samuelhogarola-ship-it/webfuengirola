# Web Fuengirola como modelo canonico de Umami

Fecha: 2026-10-13

## Auditoria actual

Web Fuengirola ya queda como referencia practica para integrar Umami en una web estatica:

- La web publica carga `umami-analytics-core.js` desde todas las paginas generadas.
- `script.js` lee `/umami-config.json` en la primera visita e inicializa el tracker sin depender del banner de cookies.
- `config/umami-config.template.json` define la configuracion publica de runtime.
- `scripts/render-umami-config.sh` genera `/umami-config.json` al arrancar el contenedor.
- `Dockerfile.web` copia la plantilla y registra el render como entrypoint.
- `tests/security.spec.js` verifica que Web Fuengirola carga el script personal antes de tocar el banner y que rechazar cookies no lo revoca.
- `tests/umami-config.test.mjs` verifica el render de configuracion, el fallback publico de Web Fuengirola y el bloqueo del VPS Agama para esta web.

WF Studio tambien tiene el modelo compartido ya implementado:

- `apps/studio-panel/src/lib/analytics/umami-core.mjs` mantiene `SITE_REGISTRY`, separa fuentes `personal` y `agama`, resuelve website IDs y consulta `stats`, `pageviews` y `metrics`.
- `fetchAllUmamiPanelData` aisla fallos por instancia y conserva resultados de la otra.
- `apps/studio-panel/src/lib/data/umami-dashboard.ts` cachea la lectura durante 300 segundos.
- `apps/studio-panel/src/components/admin/panel-analytics-section.tsx` inyecta URLs de instancia solo desde servidor.
- `PanelAnalyticsSection` renderiza `UmamiAnalyticsPanel` en los siete paneles operativos.
- El cron mensual usa el mismo core compartido, por lo que el informe mensual lee las dos instancias sin duplicar modelo.

## Instancias y variables

Hay un unico patron de integracion con dos instancias:

- `personal`: `https://analytics.187.124.55.36.sslip.io`, para Web Fuengirola y proyectos personales.
- `agama`: `https://analytics.2.24.10.239.sslip.io`, solo para Agama y TodoPlastico.

Variables privadas de WF Studio:

```dotenv
UMAMI_PERSONAL_URL=https://analytics.187.124.55.36.sslip.io
UMAMI_PERSONAL_USERNAME=admin
UMAMI_PERSONAL_PASSWORD=
UMAMI_AGAMA_URL=https://analytics.2.24.10.239.sslip.io
UMAMI_AGAMA_USERNAME=admin
UMAMI_AGAMA_PASSWORD=
UMAMI_WEBSITE_ID_WEBFUENGIROLA=
UMAMI_WEBSITE_ID_TODOPLASTICO=
```

Usa `UMAMI_WEBSITE_ID_*` para cada sitio registrado en `SITE_REGISTRY`. Los nombres legacy `STAT_REPORT_UMAMI_*` y `STAT_REPORT_UMAMI_WEBSITE_ID_*` quedan admitidos solo como fallback del origen personal durante la migracion; no deben usarse para nuevas webs.

Variables publicas de una web estatica que siga el modelo Web Fuengirola:

```dotenv
UMAMI_SCRIPT_URL=https://analytics.187.124.55.36.sslip.io/script.js
UMAMI_HOST_URL=https://analytics.187.124.55.36.sslip.io
UMAMI_WEBSITE_ID=REPLACE_WITH_SITE_WEBSITE_ID
```

Estas variables no incluyen credenciales API. Los passwords de instancia viven solo en WF Studio o en el entorno servidor que lee la API de Umami.

## Patron para una web estatica

1. Copiar `umami-analytics-core.js` al repo de la web.
2. Anadir `config/umami-config.template.json` con `scriptSrc`, `hostUrl` y `websiteId`.
3. Anadir `scripts/render-umami-config.sh` o equivalente del stack para renderizar `/umami-config.json` desde variables de entorno.
4. Cargar `umami-analytics-core.js` en todas las paginas HTML.
5. Inicializar el tracker leyendo `/umami-config.json` en la primera visita.
6. No conectar Umami al banner de cookies cuando la instalacion sea cookieless y anonima.
7. Mantener placeholders seguros en local, por ejemplo `websiteId` vacio o `REPLACE_WITH_UMAMI_WEBSITE_ID`.
8. Bloquear por test que la web no apunte a una instancia incorrecta.

Para crear y guardar el website ID:

1. Entrar en la instancia correcta de Umami.
2. Crear un website por dominio real; no reutilizar IDs entre dominios.
3. Guardar el ID en el entorno de la web como `UMAMI_WEBSITE_ID`.
4. Guardar el mismo ID en WF Studio como `UMAMI_WEBSITE_ID_<SITE_KEY_EN_MAYUSCULAS>`.
5. Desplegar la web.
6. Hacer una visita de prueba en produccion.
7. Confirmar que la visita aparece en Umami y que el panel mensual de WF Studio muestra datos o un estado explicito.

## Patron para WF Studio

Para conectar un nuevo panel mensual:

1. Anadir el sitio a `SITE_REGISTRY` con `key`, `label`, dominio, fuente (`personal` o `agama`) y `panelKey`.
2. Documentar su `UMAMI_WEBSITE_ID_*` en `apps/studio-panel/.env.example`.
3. Si hay panel operativo, renderizar `PanelAnalyticsSection` con el `panelKey` correspondiente.
4. Confirmar que `getPanelUmamiSites` devuelve el sitio esperado.
5. Confirmar que `fetchAllUmamiPanelData` mantiene aislada cada fuente.
6. Confirmar que el informe mensual sigue guardando una fila por mes con estados por sitio.

## Checklist de verificacion

- `npm run test:unit -- tests/umami-config.test.mjs`
- `npm run test`
- `npm --prefix apps/studio-panel test`
- `npm --prefix apps/studio-panel run typecheck`
- `npm --prefix apps/studio-panel run lint`
- `npm run check`
- `npm run lint`
- `npm run format:check`
- `git diff --check`
- `npm run secrets:scan` si `.tools/gitleaks/current/gitleaks` esta instalado

Para produccion, completar tambien:

- Verificar que el script responde desde la instancia correcta.
- Verificar que `data-website-id` coincide con el ID guardado.
- Hacer una visita de prueba.
- Verificar el evento en Umami.
- Verificar el panel mensual de WF Studio.

## Estado de webs y siguiente fase

| Web                         | Instancia | Estado                                                                                                                                                                                    |
| --------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web Fuengirola              | personal  | Canonica. Tracking publico y panel WF Studio implementados. Website ID local conocido: `957c045f-c060-4429-91d7-d2a1d1962ad5`.                                                            |
| Samuel Coach                | personal  | Website ID localizado en su repo. Pendiente aplicar/confirmar el patron publico y registrar `UMAMI_WEBSITE_ID_SAMUELCOACHDEALEMAN` en WF Studio.                                          |
| TodoPlástico                | agama     | Debe conservar su implementacion actual. En WF Studio se lee desde `agama` con `UMAMI_WEBSITE_ID_TODOPLASTICO`; website ID verificado localmente: `6e0256c7-fb46-4ed1-bfd8-fa030d599504`. |
| Vivir en Fuengirola         | personal  | Pendiente crear o confirmar website ID y aplicar el patron publico.                                                                                                                       |
| Conoce Fuengirola           | personal  | Pendiente crear o confirmar website ID y aplicar el patron publico.                                                                                                                       |
| Top Fuengirola              | personal  | Pendiente crear o confirmar website ID; aparece en informes aunque no tenga panel operativo propio.                                                                                       |
| Viking Fitness              | personal  | Pendiente crear o confirmar website ID; aparece en informes aunque no tenga panel operativo propio.                                                                                       |
| Personal Trainer Fuengirola | personal  | Pendiente crear o confirmar website ID; aparece en informes aunque no tenga panel operativo propio.                                                                                       |
| Gimnasio Nuevo Estilo       | personal  | Pendiente crear o confirmar website ID; aparece en informes aunque no tenga panel operativo propio.                                                                                       |
| VokabelLab                  | personal  | Pendiente crear o confirmar website ID y conectar produccion.                                                                                                                             |
| imKontext                   | personal  | Pendiente crear o confirmar website ID y conectar produccion.                                                                                                                             |
| Der Die Das                 | personal  | Pendiente crear o confirmar website ID y conectar produccion.                                                                                                                             |
| Superentrenador             | personal  | Pendiente crear o confirmar website ID y conectar produccion.                                                                                                                             |
| Coach Studio                | personal  | Pendiente crear o confirmar website ID y conectar produccion.                                                                                                                             |

## Decision operativa

Web Fuengirola queda como plantilla porque resuelve las dos mitades del modelo: tracking publico cookieless en la web estatica y lectura privada desde WF Studio. Las siguientes webs deben copiar el patron de runtime/configuracion, no crear un adaptador propio salvo que su framework lo exija; en ese caso deben conservar las mismas variables y los mismos pasos de verificacion.
