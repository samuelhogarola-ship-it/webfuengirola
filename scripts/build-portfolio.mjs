import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolioProjects } from '../portfolio/projects-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const portfolioDir = path.join(rootDir, 'portfolio');
const today = '2026-06-04';

const portfolioIntro = {
  title: 'Portfolio de Diseño Web en Fuengirola | Casos Reales',
  description: 'Portfolio con casos reales de diseño web en Fuengirola: landing pages, webs corporativas y proyectos digitales para negocios locales.',
  ogTitle: 'Portfolio de Diseño Web en Fuengirola | Web Fuengirola',
  ogDescription: 'Casos reales de landing pages, webs corporativas y proyectos digitales creados para negocios locales.',
  twitterDescription: 'Casos reales de diseño web en Fuengirola para negocios locales, captación y proyectos digitales.',
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getRelPrefix(depth = 0) {
  return depth === 0 ? '' : '../'.repeat(depth);
}

function navHref(prefix, href) {
  return `${prefix}${href}`;
}

function assetHref(prefix, href) {
  return `${prefix}${href}`;
}

function renderHeader(prefix, activePage) {
  const navItems = [
    { href: 'index.html', label: 'Inicio', key: 'home' },
    { href: 'servicios.html', label: 'Servicios', key: 'services' },
    { href: 'portfolio.html', label: 'Portfolio', key: 'portfolio' },
    { href: 'proceso.html', label: 'Proceso', key: 'process' },
  ];

  return `
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="${navHref(prefix, 'index.html')}" class="logo" aria-label="WF Studio">
        <img src="${assetHref(prefix, 'img/logo-wf.webp')}" alt="WF Studio" class="logo__img" width="36" height="36" loading="eager"/>
      </a>

      <nav class="nav" id="nav" aria-label="Navegación principal">
        <ul class="nav__list">
          ${navItems.map((item) => `<li><a href="${navHref(prefix, item.href)}" class="nav__link${item.key === activePage ? ' nav__link--active' : ''}">${item.label}</a></li>`).join('\n          ')}
          <li><a href="https://blog.webfuengirola.com" class="nav__link" target="_blank" rel="noopener noreferrer">Blog</a></li>
          <li><a href="${navHref(prefix, 'index.html#contacto')}" class="nav__link">Contacto</a></li>
        </ul>
      </nav>

      <div class="lang-switcher" style="display:none"></div>

      <a href="https://wa.me/34622923988?text=Hola%2C%20me%20interesa%20una%20web%20para%20mi%20negocio" class="btn btn--primary header__cta" target="_blank" rel="noopener noreferrer">Pedir presupuesto</a>

      <button type="button" class="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function renderFooter(prefix) {
  return `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="${navHref(prefix, 'index.html')}" class="logo logo--light" aria-label="WF Studio">
          <img src="${assetHref(prefix, 'img/logo-wf.webp')}" alt="WF Studio" class="logo__img" width="36" height="36" loading="lazy"/>
        </a>
        <p class="footer__tagline">Webs para comercios locales en la Costa del Sol.</p>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Servicios</h4>
        <ul class="footer__links">
          <li><a href="${navHref(prefix, 'servicios.html#landing-web-local')}">Landing Web Local</a></li>
          <li><a href="${navHref(prefix, 'servicios.html#web-pro')}">Web Corporativa / Web Pro</a></li>
          <li><a href="${navHref(prefix, 'servicios.html#react-automatizacion')}">React, chatbots y automatización</a></li>
          <li><a href="${navHref(prefix, 'servicios.html#apps-medida')}">Apps y herramientas a medida</a></li>
          <li><a href="${navHref(prefix, 'index.html#mantenimiento')}">Mantenimiento</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Legal</h4>
        <ul class="footer__links">
          <li><a href="${navHref(prefix, 'legal.html#aviso-legal')}">Aviso legal</a></li>
          <li><a href="${navHref(prefix, 'legal.html#privacidad')}">Política de privacidad</a></li>
          <li><a href="${navHref(prefix, 'legal.html#cookies')}">Política de cookies</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Contacto</h4>
        <ul class="footer__links">
          <li><a href="https://wa.me/34622923988" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href="mailto:info@webfuengirola.com">info@webfuengirola.com</a></li>
          <li><a href="https://wa.me/34622923988?text=Hola%2C%20me%20interesa%20una%20web%20para%20mi%20negocio" target="_blank" rel="noopener noreferrer">Pedir presupuesto</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <p>&copy; <span id="footer-year"></span> Web Fuengirola. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>

  <script src="${assetHref(prefix, 'google-analytics-core.js')}"></script>
  <script src="${assetHref(prefix, 'script.js')}"></script>
  <a
    href="https://wa.me/34622923988?text=Hola%2C%20me%20interesa%20una%20web%20para%20mi%20negocio"
    class="whatsapp-fab"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22c-1.85 0-3.67-.5-5.25-1.44l-.38-.22-3.67.96.98-3.58-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10Zm5.48-7.48c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
    <span>Pedir presupuesto</span>
  </a>`;
}

function renderHead({ title, description, canonical, ogTitle, ogDescription, ogImage, ogAlt, preloadImage, prefix }) {
  return `
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/png" href="https://webfuengirola.com/favicon.png" sizes="48x48" />
  <link rel="shortcut icon" href="https://webfuengirola.com/favicon.png" />
  <link rel="apple-touch-icon" href="https://webfuengirola.com/apple-touch-icon.png" sizes="180x180" />
  <meta property="og:title" content="${escapeHtml(ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(ogDescription)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Web Fuengirola" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:secure_url" content="${ogImage}" />
  <meta property="og:image:alt" content="${escapeHtml(ogAlt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
  <meta name="twitter:image" content="${ogImage}" />
  <link rel="preload" as="image" href="${assetHref(prefix, preloadImage)}" type="image/webp" />
  <link rel="stylesheet" href="${assetHref(prefix, 'style.css?v=9')}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
</head>`;
}

function renderTags(tags) {
  return tags.map((tag) => `<span class="tag ${tag.className}">${escapeHtml(tag.label)}</span>`).join('');
}

function renderPortfolioCard(project) {
  return `
          <article class="portfolio-card">
            <a href="portfolio/${project.slug}/" class="portfolio-card__img-link" aria-label="Abrir caso de ${escapeHtml(project.title)}">
              <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" class="portfolio-card__img" width="${project.imageWidth}" height="${project.imageHeight}" loading="lazy" decoding="async"/>
            </a>
            <div class="portfolio-card__body">
              <h3 class="portfolio-card__title"><a class="portfolio-card__title-link" href="portfolio/${project.slug}/">${escapeHtml(project.title)}</a></h3>
              <p class="portfolio-card__desc">${escapeHtml(project.description)}</p>
              <div class="portfolio-card__tags">
                ${renderTags(project.cardTags)}
              </div>
              <a href="portfolio/${project.slug}/" class="btn btn--ghost btn--sm">Saber más</a>
            </div>
          </article>`;
}

function renderPortfolioListing() {
  const cards = portfolioProjects.map(renderPortfolioCard).join('\n');
  return `<!DOCTYPE html>
<html lang="es">
${renderHead({
    title: portfolioIntro.title,
    description: portfolioIntro.description,
    canonical: 'https://webfuengirola.com/portfolio.html',
    ogTitle: portfolioIntro.ogTitle,
    ogDescription: portfolioIntro.ogDescription,
    ogImage: 'https://webfuengirola.com/img/og-cover.jpg',
    ogAlt: 'Portfolio de Web Fuengirola con proyectos para negocios locales',
    preloadImage: 'img/og-cover.webp',
    prefix: '',
  })}
<body>
${renderHeader('', 'portfolio')}

  <main>
    <section class="subpage-hero">
      <div class="container">
        <span class="badge">Portfolio</span>
        <h1 class="subpage-hero__title">Proyectos reales con criterio comercial y técnico</h1>
        <p class="subpage-hero__sub">Mostramos tanto captación local como producto digital. La idea no es enseñar cantidad, sino demostrar rango y ejecución.</p>
      </div>
    </section>

    <section class="portfolio" id="proyectos" style="padding-top:80px;">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Proyectos</span>
          <h2 class="section-title">Webs que hemos creado</h2>
          <p class="section-sub">Cada proyecto tiene ahora su propia ficha para enseñar mejor el contexto, el trabajo realizado y el valor que aporta.</p>
        </div>

        <div class="portfolio__grid">
${cards}
        </div>
      </div>
    </section>

    <section class="service-detail" style="padding-bottom:0;">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Tipos de web</span>
          <h2 class="section-title">¿Qué tipo de web necesitas?</h2>
          <p class="section-sub">No todos los encargos exigen el mismo nivel de complejidad. Estos son los formatos donde más valor aportamos.</p>
        </div>

        <div class="benefits__grid" style="margin-top:3rem;">
          <div class="benefit__item">
            <div class="benefit__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.5" rx="2"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <div>
              <h3 class="benefit__title">Landing de captación</h3>
              <p class="benefit__text">Una sola página, mensaje enfocado y CTA visibles. Perfecta para negocio local, profesionales y marcas que necesitan convertir sin sobrecomplicar la web.</p>
            </div>
          </div>
          <div class="benefit__item">
            <div class="benefit__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 9h18M9 21V9" stroke="currentColor" stroke-width="1.5"/></svg>
            </div>
            <div>
              <h3 class="benefit__title">Web corporativa</h3>
              <p class="benefit__text">Varias páginas, más contexto, mejor jerarquía SEO y una narrativa de marca más completa. Ideal para empresas con más de una línea de servicio.</p>
            </div>
          </div>
          <div class="benefit__item">
            <div class="benefit__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M6 2h12l2 6H4L6 2z" stroke="currentColor" stroke-width="1.5"/><path d="M4 8v13h16V8" stroke="currentColor" stroke-width="1.5"/><path d="M9 14h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <div>
              <h3 class="benefit__title">Tienda online</h3>
              <p class="benefit__text">Catálogo, pagos y estructura comercial más compleja. Encaja cuando la web debe convertirse en un canal de venta real.</p>
            </div>
          </div>
          <div class="benefit__item">
            <div class="benefit__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <div>
              <h3 class="benefit__title">Web app / plataforma</h3>
              <p class="benefit__text">Herramientas interactivas, paneles, reservas o sistemas propios. Aquí ya hablamos de producto digital y no solo de presencia online.</p>
            </div>
          </div>
          <div class="benefit__item">
            <div class="benefit__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <div>
              <h3 class="benefit__title">Web de captación</h3>
              <p class="benefit__text">Cada bloque está orientado a conseguir una acción concreta: contacto, reserva o lead. Es el formato base de nuestro servicio productizado.</p>
            </div>
          </div>
          <div class="benefit__item">
            <div class="benefit__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <div>
              <h3 class="benefit__title">SEO local</h3>
              <p class="benefit__text">Diseño y estructura pensados para competir mejor en búsquedas locales y conectar la web con la captación real del negocio.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-final" id="contacto" style="margin-top:40px;">
      <div class="container cta-final__inner">
        <div class="cta-final__content">
          <h2 class="cta-final__title">¿Tu negocio podría ser el siguiente?</h2>
          <p class="cta-final__sub">Cuéntanos qué haces y te decimos cómo podemos ayudarte. Sin compromiso, sin tecnicismos.</p>
          <div class="cta-final__actions">
            <a href="https://wa.me/34622923988?text=Hola%2C%20me%20interesa%20una%20web%20para%20mi%20negocio" class="btn btn--whatsapp btn--lg" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              <span>Hablar por WhatsApp</span>
            </a>
            <a href="mailto:info@webfuengirola.com" class="btn btn--outline btn--lg">Enviar un email</a>
          </div>
        </div>
      </div>
    </section>
  </main>

${renderFooter('')}
</body>
</html>`;
}

function renderDetailPage(project) {
  const prefix = '../../';
  const canonical = `https://webfuengirola.com/portfolio/${project.slug}/`;
  const siblingLinks = portfolioProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3)
    .map((item) => `<a href="../${item.slug}/" class="project-detail__related-link">${escapeHtml(item.title)}</a>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="es">
${renderHead({
    title: project.seoTitle,
    description: project.seoDescription,
    canonical,
    ogTitle: project.seoTitle,
    ogDescription: project.seoDescription,
    ogImage: project.ogImage,
    ogAlt: project.ogAlt,
    preloadImage: project.image,
    prefix,
  })}
<body>
${renderHeader(prefix, 'portfolio')}

  <main class="project-page">
    <section class="subpage-hero project-subhero">
      <div class="container project-subhero__inner">
        <nav class="project-breadcrumb" aria-label="Breadcrumb">
          <a href="${navHref(prefix, 'portfolio.html')}">Portfolio</a>
          <span>/</span>
          <span>${escapeHtml(project.title)}</span>
        </nav>
        <span class="badge">${escapeHtml(project.heroLabel)}</span>
        <h1 class="subpage-hero__title">${escapeHtml(project.title)}</h1>
        <p class="subpage-hero__sub">${escapeHtml(project.description)}</p>
        <div class="project-subhero__actions">
          <a href="${escapeHtml(project.url)}" class="btn btn--primary btn--lg" target="_blank" rel="noopener noreferrer">${escapeHtml(project.urlLabel)}</a>
          <a href="https://wa.me/34622923988?text=Hola%2C%20quiero%20algo%20como%20${encodeURIComponent(project.title)}%20para%20mi%20negocio" class="btn btn--outline btn--lg" target="_blank" rel="noopener noreferrer">Quiero algo similar</a>
        </div>
      </div>
    </section>

    <section class="service-detail project-detail">
      <div class="container">
        <div class="project-detail__hero">
          <div class="project-detail__image-card">
            <img src="${assetHref(prefix, project.image)}" alt="${escapeHtml(project.imageAlt)}" width="${project.imageWidth}" height="${project.imageHeight}" class="project-detail__image" loading="eager" decoding="async" />
          </div>
          <aside class="project-detail__summary-card">
            <span class="section-label">Project overview</span>
            <h2 class="project-detail__summary-title">${escapeHtml(project.brand)}</h2>
            <ul class="project-detail__facts">
              <li><strong>Tipo</strong><span>${escapeHtml(project.category)}</span></li>
              <li><strong>Cliente / marca</strong><span>${escapeHtml(project.client)}</span></li>
              <li><strong>Tecnologías</strong><span>${escapeHtml(project.tech.join(' · '))}</span></li>
              <li><strong>Entrega principal</strong><span>${escapeHtml(project.services.join(' · '))}</span></li>
            </ul>
          </aside>
        </div>

        <div class="project-detail__grid">
          <section class="project-detail__panel">
            <span class="section-label">Resumen</span>
            <h2 class="section-title">Qué es este proyecto</h2>
            <p class="project-detail__copy">${escapeHtml(project.longDescription)}</p>
          </section>

          <section class="project-detail__panel">
            <span class="section-label">Trabajo realizado</span>
            <h2 class="section-title">Qué se hizo</h2>
            <ul class="project-detail__list">
              ${project.services.map((service) => `<li>${escapeHtml(service)}</li>`).join('')}
            </ul>
          </section>

          <section class="project-detail__panel">
            <span class="section-label">Stack</span>
            <h2 class="section-title">Tecnologías principales</h2>
            <div class="project-detail__tags">
              ${project.tech.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join('')}
            </div>
          </section>

          <section class="project-detail__panel">
            <span class="section-label">Resultado</span>
            <h2 class="section-title">Valor aportado</h2>
            <p class="project-detail__copy">${escapeHtml(project.result)}</p>
          </section>
        </div>

        <section class="project-detail__cta">
          <div class="project-detail__cta-copy">
            <span class="section-label">Siguiente paso</span>
            <h2 class="section-title">¿Quieres algo de este nivel para tu negocio?</h2>
            <p class="project-detail__copy">Podemos plantearlo como landing local, web corporativa o producto digital según tu caso. La idea es adaptar la solución, no forzarte al formato equivocado.</p>
          </div>
          <div class="project-detail__cta-actions">
            <a href="https://wa.me/34622923988?text=Hola%2C%20quiero%20una%20web%20parecida%20a%20${encodeURIComponent(project.title)}" class="btn btn--primary btn--lg" target="_blank" rel="noopener noreferrer">Pedir una web similar</a>
            <a href="${navHref(prefix, 'portfolio.html')}" class="btn btn--ghost btn--lg">Volver al portfolio</a>
          </div>
        </section>

        <section class="project-detail__related">
          <span class="section-label">Más proyectos</span>
          <div class="project-detail__related-links">${siblingLinks}</div>
        </section>
      </div>
    </section>
  </main>

${renderFooter(prefix)}
</body>
</html>`;
}

function renderSitemap() {
  const urls = [
    { loc: 'https://webfuengirola.com/', lastmod: today },
    { loc: 'https://webfuengirola.com/servicios.html', lastmod: today },
    { loc: 'https://webfuengirola.com/portfolio.html', lastmod: today },
    ...portfolioProjects.map((project) => ({
      loc: `https://webfuengirola.com/portfolio/${project.slug}/`,
      lastmod: today,
    })),
    { loc: 'https://webfuengirola.com/proceso.html', lastmod: today },
    { loc: 'https://webfuengirola.com/legal.html', lastmod: today },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
}

function build() {
  ensureDir(portfolioDir);
  fs.writeFileSync(path.join(rootDir, 'portfolio.html'), renderPortfolioListing(), 'utf8');

  for (const project of portfolioProjects) {
    const detailDir = path.join(portfolioDir, project.slug);
    ensureDir(detailDir);
    fs.writeFileSync(path.join(detailDir, 'index.html'), renderDetailPage(project), 'utf8');
  }

  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), renderSitemap(), 'utf8');
}

build();
