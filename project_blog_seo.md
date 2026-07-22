# Memoria SEO blog Web Fuengirola

Estas reglas deben aplicarse por defecto en futuros posts o páginas del blog estático de `webfuengirola.com`, salvo que se indique lo contrario:

- Estructura del blog en `/blog/` con URLs limpias tipo `/blog/slug-del-post/`.
- Cada post debe incluir:
  - `<title>` con la keyword principal al principio o de forma natural.
  - `<meta name="description">` entre 140 y 160 caracteres.
  - `<link rel="canonical">` absoluto.
  - `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`.
  - Open Graph completo: `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `og:locale`.
  - Twitter Card completo: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
  - `favicon.webp`, `apple-touch-icon.png` y `<link rel="manifest" href="/site.webmanifest">`.
  - JSON-LD con `BreadcrumbList` y `BlogPosting`.
  - Autor visible y `Person` en `BlogPosting`, enlazado a `/sobre-nosotros/`.
  - Fecha de publicación real: una fecha futura no debe quedar accesible como `index, follow`.
  - Imagen destacada en WebP, con dimensiones declaradas y un peso objetivo inferior a 100 KB.
  - Footer con el texto `Diseñado por WF Studio` enlazando a `https://webfuengirola.com/`.
- Tono editorial:
  - Cercano, claro y fácil de leer.
  - Orientado a negocio local y captación real, sin tecnicismos innecesarios.
  - Mostrar ventajas e inconvenientes cuando el tema lo pida.
- Enlazado interno:
  - Aprovechar enlaces hacia servicios o productos relevantes de Web Fuengirola.
  - Enlazar solo posts ya publicados y relacionados con el tema, evitando bloques idénticos en todos los artículos.
- Preguntas frecuentes:
  - Mantenerlas visibles cuando ayuden al lector.
  - No añadir `FAQPage` por defecto: una web comercial local no debe esperar rich results de FAQ.
- Temas prioritarios:
  - Diferencia entre Google, web propia y redes sociales.
  - Cambios de algoritmo, dependencia de plataformas, SEO local, IA y visibilidad.
