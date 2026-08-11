# Pipeline de posts sociales

Esta carpeta contiene posts de campana en Markdown. Cada fichero `post-XX-slug.md` debe incluir:

- frontmatter con `title`, `date`, `time`, `post_number` y `platforms`
- `## Copy`
- `## Prompt para generar la foto`
- `## Descripcion SEO (alt text)` o `## Descripción SEO (alt text)`
- `## Hashtags`

Las imagenes finales van en `content/posts/images/` con el mismo slug del Markdown:

```text
content/posts/post-01-google-invisible.md
content/posts/images/post-01-google-invisible.png
```

## Preparar entrega

```bash
npm run content:social
```

El comando valida la campana y genera:

- `dist/social-campaign/calendar.csv`
- `dist/social-campaign/manifest.json`
- `dist/social-campaign/image-prompts.json`
- `dist/social-campaign/posts/<post-slug>/instagram-caption.txt`
- `dist/social-campaign/posts/<post-slug>/linkedin-caption.txt`
- copia de la imagen final de cada post

Si todavia no estan las imagenes, se puede preparar solo el paquete de prompts:

```bash
npm run content:social -- --allow-missing-images
```

Nota: este pipeline prepara los assets y captions. La publicacion o programacion en Instagram/LinkedIn depende de una herramienta externa o un conector con acceso a esas cuentas.
