# NEXT

## Current Focus

Extender el patrón ya aplicado en `servicios.html` al resto del sitio: más claridad comercial, más consistencia SEO y mejor conexión entre home, portfolio, blog y productos.

## Prioridad Alta

- Unificar SEO técnico en todas las páginas principales.
  - Llevar el mismo estándar del blog a `servicios.html`, `portfolio.html`, `proceso.html`, `legal.html`, productos y proyectos.
  - Estándar objetivo: `favicon.webp`, `manifest`, `robots` completo con `max-snippet` y `max-video-preview`, `og:image:alt`, Twitter Card y canonical revisado.
- Mejorar el `sitemap.xml` cada vez que se publiquen posts, productos o nuevos casos de portfolio.
- Revisar el home para subir intención comercial y claridad.
  - Hero más directo sobre resultado para negocio local.
  - Mejor jerarquía entre prueba social, servicios y CTA.
  - Añadir una señal visual clara de “qué incluye” y “para quién es”.
- Consolidar el nuevo recorrido comercial de `servicios.html`.
  - Revisar si hace falta afinar copy entre `Web Lite` y `Web Express`.
  - Aprovechar el nuevo bloque de proyectos, casos y comparativa como patrón reusable para futuras landings comerciales.
- Reforzar UI/UX del blog.
  - Mejorar jerarquía entre portada, artículos relacionados y CTA.
  - Mantener imágenes destacadas en `.webp` dentro del render del post.
  - Revisar espaciados de héroes y bloques largos para que no “floten”.

## Prioridad Media

- Crear un cuestionario corto para recomendar tipo de web.
  - Flujo de 1 pantalla o pasos mínimos.
  - Resultado: `Web Lite / Web Express / Web personalizada`.
  - Captura de lead con resumen de respuestas.
- Añadir enlazado interno más estratégico entre blog, servicios, productos y portfolio.
- Preparar un patrón reusable para nuevas páginas de blog.
  - Metadatos SEO.
  - JSON-LD.
  - Imagen OG.
  - CTA interno.
- Revisar `README.md`.
  - Ahora no refleja la estructura real del proyecto ni el despliegue actual.

## Prioridad Baja

- Automatizar generación de `sitemap.xml` y chequeos básicos antes de publicar.
- Preparar versión futura del blog para migración a WordPress sin romper URLs ni SEO.
- Valorar mini hub de recursos descargables o guías cortas para captar leads.

## SEO Review Rápida

- Bien resuelto:
  - Blog estático con URLs limpias.
  - Canonicals correctos en blog.
  - Open Graph y Twitter Cards en posts.
  - JSON-LD en home y blog.
  - Imágenes `.webp` ya preparadas para render visual.
- Mejoras pendientes:
  - El estándar SEO del blog todavía no está extendido al resto del sitio.
  - `sitemap.xml` debe incluir siempre blog, posts y futuras páginas nuevas.
  - Falta revisar interlinking contextual desde home y servicios hacia artículos.
  - Conviene revisar títulos y descripciones de páginas de producto con enfoque más local/comercial.

## UI/UX Review Rápida

- Lo que ya funciona:
  - Dirección visual limpia y premium.
  - Portfolio y blog transmiten más seriedad que una landing genérica.
  - Las cards y CTAs ya tienen una base sólida.
- Donde conviene apretar:
  - La home todavía puede vender mejor desde el primer pantallazo.
  - Hay páginas con jerarquía visual menos consistente que el blog nuevo.
  - Falta una pieza interactiva que ayude al usuario indeciso a avanzar solo.

## Futuro: Área Cliente Básica

- Objetivo:
  - Dar acceso simple a clientes para ver en qué estado está su proyecto y qué incluye su servicio.
- MVP recomendado:
  - Acceso por email + enlace mágico o login simple.
  - Panel con:
    - estado del proyecto: `pendiente`, `en diseño`, `en revisión`, `publicado`
    - resumen de lo contratado
    - entregables o enlaces clave
    - próximos pasos
    - forma rápida de contacto
- Recomendación técnica:
  - Mantener la web pública estática.
  - Construir el área cliente como módulo separado (`/clientes/`) con backend ligero.
  - Candidatos razonables para MVP: Supabase Auth + tabla simple de proyectos.

## Siguiente Arranque Recomendado

1. Sincronizar esta worktree con `main` o arrancar la siguiente tarea ya desde `main`.
2. Extender el estándar SEO del blog a páginas principales y productos.
3. Mejorar la home con foco en claridad comercial y prueba social.
4. Diseñar el flujo del cuestionario recomendador.
