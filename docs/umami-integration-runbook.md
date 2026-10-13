# Umami integration runbook

Este documento deja Web Fuengirola como modelo canónico para llevar Umami a las
demás webs sin depender de un hosting concreto. El patrón separa dos piezas:
tracking público cookieless en cada web y lectura privada server-side desde WF
Studio.

## Contrato portable

- Cada web pública tiene su propio website en Umami y su propio website ID.
- El website ID es configuración pública, pero no debe quedar fijado como
  fallback real en el repositorio.
- Las credenciales de Umami solo viven en servidor, nunca en una imagen web
  estática ni en JavaScript de navegador.
- La instancia `personal` recoge Web Fuengirola y proyectos personales.
- La instancia `agama` queda reservada para Agama y TodoPlastico.
- Las variables legacy `STAT_REPORT_UMAMI_*` siguen admitidas para no romper el
  cron mensual existente, pero las nuevas altas deben usar `UMAMI_*`.

## Web publica estatica

Archivos necesarios:

- `umami-analytics-core.js`: loader anonimo y cookieless. No carga nada si falta
  `websiteId`.
- `config/umami-config.template.json`: plantilla con `scriptSrc`, `hostUrl` y
  `websiteId`.
- `scripts/render-umami-config.sh`: renderer de entorno a `/umami-config.json`.
- `umami-config.json`: archivo local inerte con `websiteId` vacio.

Variables por hosting:

```dotenv
UMAMI_SCRIPT_URL=https://analytics.187.124.55.36.sslip.io/script.js
UMAMI_HOST_URL=https://analytics.187.124.55.36.sslip.io
UMAMI_WEBSITE_ID=
```

En Coolify/nginx, el entrypoint ejecuta `scripts/render-umami-config.sh` al
arrancar el contenedor. En Vercel u otro hosting estático, el mismo contrato se
puede resolver generando el JSON durante build o exponiendo un endpoint/config
equivalente, siempre con `websiteId` desde variables del proyecto.

## WF Studio / Next

Archivos principales:

- `apps/studio-panel/src/lib/analytics/umami-core.mjs`: registro de sitios,
  conexiones `personal` y `agama`, autenticación y consultas a Umami.
- `apps/studio-panel/src/lib/data/umami-dashboard.ts`: caché server-side de 300
  segundos.
- `apps/studio-panel/src/components/admin/umami-analytics-panel.tsx`: panel
  visual reutilizable.
- `apps/studio-panel/src/app/api/monthly-stat-reports/route.ts`: informe mensual
  con ambas fuentes.

Variables server-side:

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

Para cada sitio del registro se usa `UMAMI_WEBSITE_ID_<SITE_KEY_EN_MAYUSCULAS>`.
Si el ID falta, el panel muestra un estado explicito de configuración pendiente.
Para la instancia personal, WF Studio mantiene fallback temporal a
`STAT_REPORT_UMAMI_URL`, `STAT_REPORT_UMAMI_USERNAME`,
`STAT_REPORT_UMAMI_PASSWORD` y `STAT_REPORT_UMAMI_WEBSITE_ID_*`.

## Registrar una web nueva

1. Crear el website en la instancia Umami correcta.
2. Guardar el website ID en el hosting público de la web.
3. Añadir el sitio a `SITE_REGISTRY` si debe aparecer en WF Studio o informes.
4. Añadir `UMAMI_WEBSITE_ID_<KEY>` a `apps/studio-panel/.env.example`.
5. Asignar `panelKey`: panel concreto o `reports-only`.
6. Desplegar la web y confirmar que `/umami-config.json` contiene el host y el
   ID esperado.
7. Abrir una visita de prueba y comprobar que aparece en Umami.
8. Confirmar en WF Studio que el panel muestra datos o un estado pendiente
   localizado.

## Checklist de verificacion

- `node --test tests/umami-config.test.mjs`
- `node --test apps/studio-panel/tests/umami-core.test.mjs`
- `node --test apps/studio-panel/tests/monthly-stat-reports.test.mjs`
- `node --test apps/studio-panel/tests/umami-panel-ui.test.mjs`
- `npm run check`
- `git diff --check`
- Revisar que ninguna ruta ejecutable de Web Fuengirola apunte a la instancia
  Agama.
- Revisar que no haya passwords ni bearer tokens en archivos trackeados.

## Inventario de webs

Estado inferido del repo, sin inventar IDs:

| Web                         | Instancia | Panel           | Estado de tracking                                                           |
| --------------------------- | --------- | --------------- | ---------------------------------------------------------------------------- |
| Web Fuengirola              | personal  | wf-studio       | Configuración pública preparada; requiere `UMAMI_WEBSITE_ID` en hosting      |
| Vivir en Fuengirola         | personal  | vivir           | Registrada en WF Studio; ID pendiente por entorno                            |
| Conoce Fuengirola           | personal  | conoce          | Registrada en WF Studio; ID pendiente por entorno                            |
| Top Fuengirola              | personal  | reports-only    | Registrada solo para informes; ID pendiente por entorno                      |
| Samuel Coach de Aleman      | personal  | samuel-coach    | Registrada en WF Studio; ID pendiente por entorno                            |
| Viking Fitness              | personal  | reports-only    | Registrada solo para informes; ID pendiente por entorno                      |
| Personal Trainer Fuengirola | personal  | reports-only    | Registrada solo para informes; ID pendiente por entorno                      |
| Gimnasio Nuevo Estilo       | personal  | reports-only    | Registrada solo para informes; ID pendiente por entorno                      |
| VokabelLab                  | personal  | vokabel-world   | Registrada en WF Studio; ID pendiente por entorno                            |
| imKontext                   | personal  | vokabel-world   | Registrada en WF Studio; ID pendiente por entorno                            |
| Der Die Das                 | personal  | vokabel-world   | Registrada en WF Studio; ID pendiente por entorno                            |
| Superentrenador             | personal  | superentrenador | Registrada en WF Studio; ID pendiente por entorno                            |
| Coach Studio                | personal  | superentrenador | Registrada en WF Studio; ID pendiente por entorno                            |
| TodoPlastico                | agama     | todoplastico    | Registrada en WF Studio; ID pendiente por entorno                            |
| Horses of Gili              | pendiente | Web Social      | No aparece en `SITE_REGISTRY`; pendiente de alta si debe tener panel/informe |
| Leigan                      | pendiente | Web Social      | No aparece en `SITE_REGISTRY`; pendiente de URL, captura y alta Umami        |
