# Tres guías para negocios locales

Actualización: 6 de octubre de 2026, 10:33 Asia/Makassar (UTC+08:00).
Estado: **desarrollado**. Fusión y publicación pendientes de revisión y comprobación posterior en producción. Las URL siguientes son destinos previstos; este informe no afirma que estén publicadas.

## URL nuevas

El registro CSV contiguo recoge las tres URL nuevas, intención, fuentes y comprobaciones. Se conserva por entrega para añadir futuros registros sin sustituir el historial.

1. https://webfuengirola.com/blog/web-para-entrenador-personal-contenidos-contacto/ — estructura, confianza y primera consulta para servicios de entrenamiento.
2. https://webfuengirola.com/blog/como-medir-contactos-web-negocio-local/ — distinguir clic, consulta, cita y venta; registro práctico sin atribución inventada.
3. https://webfuengirola.com/blog/contenidos-locales-utiles-sin-duplicar-paginas/ — preguntas reales, pruebas locales y decisión de crear o actualizar contenido.

Solo español. No se crean URL EN/DE/FI ni se anuncian equivalencias inexistentes. Las 63 traducciones previas y los 21 artículos españoles anteriores permanecen sin cambios.

## Recursos existentes actualizados

- https://webfuengirola.com/blog/ — tres tarjetas nuevas, 24 artículos en español.
- https://webfuengirola.com/sitemap.xml — tres URL canónicas añadidas, 181 URL totales.
- Generador de blog: conserva fechas anteriores y admite enlaces contextuales en las nuevas guías. El generador multilingüe exige entradas de traducción explícitas.
- Sin cambios de CSS, logotipo, fuentes, JavaScript de producción ni imágenes. Se reutilizan tres WebP de menos de 100 KB cada uno.

## Fuentes y comprobaciones

Fuentes oficiales enlazadas junto a sus afirmaciones y detalladas por artículo en el CSV: Google Search Central (contenido útil y páginas puerta), Search Console (clics e impresiones) y Google Business Profile (rendimiento). Las cuatro URL respondieron HTTP 200 el 6 de octubre de 2026.

- 37 pruebas unitarias: correctas; incluyen descripción de 140–160 caracteres, canonical, BlogPosting/Person, fechas reales, enlaces locales, peso de imágenes, sitemap e idiomas.
- 5 pruebas Chromium: correctas; blog existente y nuevas guías en 1440 y 390 px, imágenes cargadas, FAQ operables, enlaces de fuentes accesibles, sin desbordamiento.
- Lint y comprobación sintáctica: correctos.
- Regeneración blog+sitemap: 95 archivos idénticos antes/después; fechas históricas intactas.
- Revisión visual: escritorio y móvil; capturas finales entrenador-desktop.png, entrenador-mobile.png, contactos-desktop.png, contactos-mobile.png, contenidos-desktop.png y contenidos-mobile.png. Detalle adicional contenidos-mobile-viewport.png.

Las capturas se conservan en la carpeta de revisión de la entrega (`output/seo-20261006/web-fuengirola` del espacio de trabajo). Su adjunto al cliente corresponde al cierre verificado en WF-Studio; una ruta local no sustituye un adjunto accesible.

## Revisión y pendientes

PR: pendiente de creación; el enlace se incorpora al registro de entrega al crearla.
WF-Studio: registro pendiente a cargo de la coordinación, sin escritura desde esta subtarea.
Publicación: comprobar las tres páginas y su versión después de fusionar; no basta con HTTP 200.

El control de dependencias detectó GHSA-vc2v-76pw-4v95 en compression 1.8.1, dependencia de desarrollo de serve. Se aplica un override acotado a serve → compression 1.8.2, sin modificar el código publicado. Instalación aislada con npm ci y audit-ci correctos: 0 vulnerabilidades.
