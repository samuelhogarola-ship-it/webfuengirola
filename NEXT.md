# NEXT

## Contexto Actual

Este repo ya no es solo una landing estática.

Hoy conviven dos sistemas distintos dentro del mismo proyecto:

- la web pública estática de `webfuengirola.com`
- la subapp `apps/studio-panel`, construida con Next.js 15 + Supabase

El siguiente arranque debe partir de esa realidad para no mezclar prioridades ni romper despliegues.

## Estructura Real del Proyecto

### 1. Web pública estática

La raíz del repo sigue siendo la web comercial principal:

- `index.html`
- `style.css`
- `script.js`
- páginas internas en carpetas como:
  - `servicios/`
  - `casos/`
  - `portfolio/`
  - `blog/`
  - `contacto/`
  - `productos/`
  - `recursos/`

También viven aquí:

- `robots.txt`
- `sitemap.xml`
- `legal.html`
- `Dockerfile.web`
- scripts de build estático para portfolio, servicios y casos

### 2. Panel / backend web

La parte dinámica está en `apps/studio-panel/`.

Stack actual:

- Next.js 15
- React 19
- App Router
- TypeScript
- Tailwind CSS
- Supabase SSR/Auth/Database
- Resend

Piezas principales:

- `src/app/`
  - rutas públicas
  - rutas protegidas de admin y cliente
  - APIs como `/api/contact`
  - callback auth
- `src/lib/`
  - auth
  - env
  - supabase
  - data access
  - server actions
  - seguridad de redirects
- `src/components/`
  - UI base
  - formularios auth
  - formularios admin/cliente
- `tests/`
  - auth
  - seguridad
  - migraciones

### 3. Base de datos / Supabase

La estructura SQL compartida está en:

- `supabase/migrations/`
- `supabase/policies/`

Migraciones clave ya presentes:

- `202606210001_studio_panel.sql`
- `202606220001_minutes_columns_compat.sql`
- `202606230001_add_pack_type_to_packs.sql`
- `202606300001_studio_panel_hardening.sql`

### 4. Core reusable

La base reutilizable para futuros proyectos sigue en:

- `core/README.md`
- `core/web-project-intake.md`
- `core/web-project-questionnaire.md`
- `core/web-project-brief-template.md`

## Estado Técnico Resumido

### Web pública

- stack estático rápido y simple
- blog, portfolio, casos y servicios ya generados como HTML
- calculadora comercial ya mejorada recientemente
- SEO mejor en blog que en algunas páginas corporativas

### Studio Panel

- ya tiene endurecimiento reciente en auth, redirects y documentación
- depende de variables `NEXT_PUBLIC_*` disponibles en build time
- da soporte al formulario público vía:
  - `/api/contact/config`
  - `/api/contact`
- `next.config.ts` es mínimo y solo define `outputFileTracingRoot`

## Riesgos que no hay que olvidar

- no mezclar cambios de la web estática con cambios del panel sin una razón clara
- el formulario público depende del panel, no solo del HTML estático
- las variables de entorno del panel en Coolify tienen impacto directo en auth y contacto
- la documentación raíz (`README.md`) ya no refleja bien toda la estructura real del repo

## Prioridad Alta

- unificar la documentación del repo para reflejar:
  - web pública estática
  - panel Next en `apps/studio-panel`
  - dependencias entre ambos
- seguir extendiendo el estándar SEO del blog al resto de páginas clave
- revisar despliegue y variables del `studio-panel` cuando se toque auth, contacto o callbacks
- mantener separadas las validaciones:
  - web pública: smoke/SEO/render
  - panel: lint/typecheck/test/build

## Prioridad Media

- actualizar `README.md` raíz para dejar de describir el proyecto como una simple landing de 3 archivos
- definir mejor la frontera entre:
  - contenido comercial público
  - panel interno / portal cliente
  - APIs compartidas
- preparar automatización más fiable de `sitemap.xml`
- revisar si el panel necesita ya upgrade controlado de Next dentro de `apps/studio-panel`

## Prioridad Baja

- automatizar chequeos previos a publish para páginas nuevas
- ordenar previews y demos antiguas para reducir ruido del repo
- separar mejor artefactos generados y código fuente cuando convenga

## Siguiente Arranque Recomendado

1. Actualizar `README.md` raíz para que refleje la estructura completa del proyecto.
2. Si se trabaja en el panel, entrar directamente por `apps/studio-panel/package.json`, `README.md` y `src/app/`.
3. Si se trabaja en la web pública, entrar por `index.html`, `style.css`, `script.js`, `data/` y las carpetas de páginas.
4. Antes de tocar deploy o auth, revisar siempre `apps/studio-panel/README.md` y `supabase/migrations/`.
