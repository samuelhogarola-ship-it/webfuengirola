# Web Fuengirola

Landing estática para vender páginas web a pequeños comercios locales en Fuengirola y la Costa del Sol.

**Tecnología:** HTML + CSS + JS puro. Sin frameworks ni dependencias externas (solo la fuente Inter desde Google Fonts).

## Core reusable

El repo ya incluye una base para arrancar nuevas propuestas web de forma sistematica en [`core/`](/Users/sam/.codex/worktrees/53a7/web%20fuengirola/core/README.md).

- `core/web-project-intake.md`
  Define el sistema de preguntas y decisiones previas.
- `core/web-project-brief-template.md`
  Plantilla lista para duplicar antes de crear una preview o una web nueva.

---

## Estructura de archivos

```
/
├── index.html    → Estructura y contenido de toda la web
├── style.css     → Estilos y diseño responsive
├── script.js     → Scroll suave, menú móvil, animaciones
└── README.md     → Este archivo
```

---

## Cómo editar textos

Abre `index.html` con cualquier editor de texto (VSCode, Sublime, Notepad++).

Los textos principales están en estas secciones del HTML:

| Sección   | Qué buscar en el HTML                                                  |
| --------- | ---------------------------------------------------------------------- |
| Hero      | `class="hero__title"`, `class="hero__subtitle"`, `class="hero__price"` |
| Servicios | `class="service-card"` (hay 4 tarjetas)                                |
| Portfolio | `class="portfolio-card"` (hay 4 tarjetas)                              |
| Proceso   | `class="process__step"` (hay 4 pasos)                                  |
| Precios   | `class="pricing__card"`                                                |
| CTA final | `class="cta-final__title"`                                             |

---

## Cómo cambiar el teléfono de WhatsApp

1. Busca en `index.html` el texto `34644220965`
2. Reemplázalo con tu número real (sin el `+`, solo los dígitos): p.ej. `34612345678`

El enlace de WhatsApp sigue el formato:

```
https://wa.me/34612345678?text=Hola%2C%20me%20interesa%20una%20web%20para%20mi%20negocio
```

Puedes personalizar el texto pre-cargado cambiando la parte después de `?text=` (URL-encoded).

---

## Cómo cambiar el email de contacto

Busca en `index.html`:

```
webfuengirola@pm.me
```

Reemplázalo con tu dirección real en todos los lugares donde aparece (hay dos: el botón del CTA final y el footer).

---

## Cómo cambiar los proyectos del portfolio

Cada tarjeta del portfolio tiene esta estructura en `index.html`:

```html
<article class="portfolio-card">
  <!-- Color de fondo del mockup: cambia el gradient -->
  <div
    class="portfolio-card__image-inner"
    style="background: linear-gradient(...)"
  >
    ...
  </div>
  <div class="portfolio-card__body">
    <h3 class="portfolio-card__title">NOMBRE DEL PROYECTO</h3>
    <p class="portfolio-card__desc">DESCRIPCIÓN BREVE</p>
    <div class="portfolio-card__tags">
      <span class="tag">ETIQUETA 1</span>
      <span class="tag">ETIQUETA 2</span>
    </div>
    <!-- Cambia href="#" por la URL real del proyecto -->
    <a href="#" class="btn btn--ghost btn--sm">Ver web</a>
  </div>
</article>
```

Para añadir un proyecto real:

1. Cambia el `h3` con el nombre del negocio.
2. Actualiza la descripción en el `p`.
3. Ajusta las etiquetas según el sector y tipo de web.
4. Pon la URL real en el `href="#"` del botón "Ver web".

---

## Activar Google Analytics

En `index.html`, dentro del `<head>`, localiza el bloque comentado:

```html
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->
```

1. Elimina los comentarios `<!--` y `-->`.
2. Sustituye `G-XXXXXXXXXX` por tu ID real de Google Analytics 4.

---

## Activar Google Search Console

En `index.html`, dentro del `<head>`, localiza:

```html
<!-- <meta name="google-site-verification" content="TU_CODIGO_AQUI" /> -->
```

1. Elimina los comentarios `<!--` y `-->`.
2. Sustituye `TU_CODIGO_AQUI` por el código que te da Search Console al verificar la propiedad.

---

## Cómo desplegar en Hostinger

1. Entra en tu panel de control de Hostinger.
2. Ve a **Administrador de archivos** → carpeta `public_html`.
3. Sube los cuatro archivos:
   - `index.html`
   - `style.css`
   - `script.js`
   - (el README no es necesario en producción)
4. Asegúrate de que `index.html` queda en la raíz de `public_html`.
5. Tu web estará disponible en tu dominio inmediatamente.

**Alternativa con Git:** Si configuras un repositorio en Hostinger Git, puedes hacer `git push` y el despliegue es automático.

---

## Personalización avanzada

- **Colores:** Edita las variables CSS en `style.css` dentro del bloque `:root { ... }`.
- **Fuente:** Cambia `Inter` por cualquier otra fuente de Google Fonts en `index.html` (enlace en el `<head>`) y en `style.css` (variable `--font`).
- **Logo:** Sustituye el bloque `.logo__mark` por una etiqueta `<img>` con tu logotipo.

---

## Contacto del desarrollador

Web Fuengirola · webfuengirola@pm.me

---

## Deployment Checklist

El formulario de `/contacto/` no funciona solo con el estático. También necesita el panel/API desplegado para exponer:

- `/api/contact/config`
- `/api/contact`

### Variables del formulario

Configura estas variables en `apps/studio-panel`:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

Variables adicionales del panel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `APP_URL`
- `NEXT_PUBLIC_APP_URL`

`APP_URL` debe ser la URL canónica del panel y coincidir con `NEXT_PUBLIC_APP_URL` en producción para que magic links, callbacks y metadata apunten al dominio correcto.

### Dependencia actual del frontend

[`contacto/index.html`](/Users/sam/Desktop/webs/web%20fuengirola/contacto/index.html) usa `data-api-base="https://admin.webfuengirola.com"`.

Eso significa que el formulario espera estos endpoints en producción:

- `https://admin.webfuengirola.com/api/contact/config`
- `https://admin.webfuengirola.com/api/contact`

### Verificación rápida postdeploy

```bash
curl -s -i -H 'Origin: https://webfuengirola.com' https://admin.webfuengirola.com/api/contact/config
curl -s -i -H 'Origin: https://www.webfuengirola.com' https://admin.webfuengirola.com/api/contact/config
curl -s -i -H 'Origin: https://evil.example' https://admin.webfuengirola.com/api/contact/config
```
