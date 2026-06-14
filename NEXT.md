# NEXT

## Current Focus

Consolidar el nuevo pulido visual premium/minimalista después del rediseño de `servicios.html`: ahora toca validar ese nivel en `home`, extenderlo a `portfolio.html` y mantener coherencia en el resto del sistema visual.

## Prioridad Alta

- Unificar SEO técnico en todas las páginas principales.
  - Llevar el mismo estándar del blog a `servicios.html`, `portfolio.html`, `proceso.html`, `legal.html`, productos y proyectos.
  - Estándar objetivo: `favicon.webp`, `manifest`, `robots` completo con `max-snippet` y `max-video-preview`, `og:image:alt`, Twitter Card y canonical revisado.
- Mejorar el `sitemap.xml` cada vez que se publiquen posts, productos o nuevos casos de portfolio.
- Revisar el home para subir intención comercial y claridad.
  - Ya se ha hecho un primer pase de premiumización sobria.
  - Falta revisar visualmente si el hero, trust, servicios y CTA final necesitan un segundo ajuste fino.
- Consolidar el nuevo recorrido comercial de `servicios.html`.
  - Validar en frío si el nuevo hero, la selección de proyectos y la sección de precios transmiten suficiente claridad comercial.
  - Revisar si hace falta afinar copy entre `Web Lite` y `Web Express`.
  - Usar esta página como patrón premium para futuras landings comerciales.
- Extender el criterio visual premium al resto de páginas clave.
  - `portfolio.html`: menos sensación de listado y más selección curada.
  - `proceso.html` y blog: heredar spacing, jerarquía y silencio visual sin rediseñar estructura.
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
2. Hacer revisión visual del pulido premium en home con navegador disponible y ajustar lo que aún se sienta cargado.
3. Extender ese mismo criterio a `portfolio.html` y comprobar consistencia entre home, servicios y portfolio.
4. Retomar la unificación SEO del blog hacia páginas principales y productos.
