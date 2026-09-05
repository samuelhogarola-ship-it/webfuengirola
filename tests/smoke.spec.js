const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("@playwright/test");

test("landing principal carga con hero y CTA principal", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Web Fuengirola/i);
  await expect(page.locator("h1")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /pedir presupuesto/i }).first(),
  ).toBeVisible();
});

test("landing explica la propuesta local y la arquitectura comercial", async () => {
  const html = fs.readFileSync(
    path.join(__dirname, "..", "index.html"),
    "utf8",
  );

  expect(html).toMatch(/WF-Studio: diseño web en Fuengirola/i);
  expect(html).toMatch(/Tres modalidades, el mismo precio para cada sector/i);
  expect(html).toMatch(/Web Lite[\s\S]*data-tier-price="200"/i);
  expect(html).toMatch(/Web Express[\s\S]*data-tier-price="350"/i);
  expect(html).toMatch(/Web Profesional[\s\S]*data-tier-price="600"/i);
});

test("landing enlaza versiones equivalentes desde la cabecera", async ({ page }) => {
  await page.goto("/");

  const switcher = page.locator(".lang-switcher:not(.lang-switcher--mobile)");
  await expect(switcher).toBeVisible();
  await expect(switcher.getByRole("link", { name: "Español" })).toHaveAttribute(
    "href",
    "https://webfuengirola.com/",
  );
  await expect(switcher.getByRole("link", { name: "English" })).toHaveAttribute(
    "href",
    "https://webfuengirola.com/en/",
  );

  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "We use cookies" })).toBeVisible();
  await expect(page.locator(".cookie-banner-img")).toHaveAttribute(
    "src",
    "/img/cookie-funny.webp",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/websites-for-restaurants-fuengirola/");
  await page.locator("#hamburger").click();
  await expect(page.locator(".lang-switcher--mobile")).toBeVisible();
  await expect(page.locator(".lang-switcher--mobile a")).toHaveCount(4);
});

test("footer comercial mantiene contraste y enlaces esenciales", async ({ page }) => {
  await page.goto("/en/");
  const footerHeading = page.locator(".footer h4").first();
  await expect(footerHeading).toBeVisible();
  const colors = await footerHeading.evaluate((node) => {
    const text = getComputedStyle(node).color;
    const background = getComputedStyle(node.closest("footer")).backgroundColor;
    return { text, background };
  });
  expect(colors.text).not.toBe(colors.background);
  await expect(page.locator('.footer a[href="/en/web-applications-fuengirola/"]')).toBeVisible();
  await expect(page.locator('.footer a[href="/en/automation-ai-fuengirola/"]')).toBeVisible();
  await expect(page.locator('.footer a[href="/en/legal/#privacy"]')).toBeVisible();
});

test("las páginas comerciales mantienen selector de idioma equivalente", async ({
  page,
}) => {
  const urls = [
    "/contacto/",
    "/web-para-clinicas-fuengirola/",
    "/precios-diseno-web-fuengirola/",
    "/auditoria-web-gratis/",
  ];

  for (const url of urls) {
    await page.goto(url);
    await expect(page.locator(".lang-switcher")).toHaveCount(2);
    await expect(page.locator(".lang-switcher a")).toHaveCount(8);
  }
});

test("landing muestra los botones principales del hero", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /pedir presupuesto/i }).first(),
  ).toBeVisible();
  await expect(page.locator("h1")).toContainText(
    /WF-Studio: diseño web en Fuengirola/i,
  );
  await expect(
    page.getByRole("heading", { name: /lo que resolvemos en Fuengirola/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /una web pensada para tu sector/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /tres modalidades, el mismo precio para cada sector/i,
    }),
  ).toBeVisible();
  await expect(page.locator(".lang-switcher")).toHaveCount(2);
  await expect(page.getByRole("link", { name: /auditoría gratuita/i }).first()).toBeVisible();
});

test("servicios presenta las cuatro categorías principales", async ({
  page,
}) => {
  await page.goto("/servicios/");

  await expect(page).toHaveTitle(
    /servicios web en fuengirola \| diseño web, seo local y automatización/i,
  );
  await expect(
    page.getByRole("heading", {
      name: /servicios web en Fuengirola para negocios que quieren vender mejor online/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /diseño web/i }).first(),
  ).toBeVisible();
  await expect(
    page
      .locator(
        'a[href="../servicios/diseno-web/"], a[href="/servicios/diseno-web/"]',
      )
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator(
        'a[href="../servicios/seo-local/"], a[href="/servicios/seo-local/"]',
      )
      .first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(/mantenimiento/i);
  await expect(page.locator("body")).toContainText(/automatización/i);
});

test("servicio de diseño web no arrastra promesas comerciales antiguas", async ({
  page,
}) => {
  await page.goto("/servicios/diseno-web/");

  await expect(page.locator("body")).not.toContainText(
    /hosting el primer año/i,
  );
  await expect(page.locator("body")).not.toContainText(/lista en 5 días/i);
  await expect(page.locator("body")).not.toContainText(/lista en 7-10 días/i);
  await expect(page.locator("body")).not.toContainText(/lista en 10-15 días/i);
  await expect(page.locator("body")).not.toContainText(/páginas ilimitadas/i);
  await expect(page.locator("body")).toContainText(
    /cada formato cambia por alcance/i,
  );
});

test("contacto refuerza enfoque local y vías de contacto", async ({ page }) => {
  await page.goto("/contacto/");

  await expect(page).toHaveTitle(/contacta con wf-studio en fuengirola/i);
  await expect(
    page.getByRole("heading", { name: /contacta con wf-studio en fuengirola/i }).first(),
  ).toBeVisible();
  await expect(page.locator("form[data-contact-form]")).toBeVisible();
  await expect(page.getByRole("link", { name: /whatsapp/i })).toBeVisible();
});

test("calculadora de precios orienta sin etiquetas de próximamente", async ({
  page,
}) => {
  await page.goto("/recursos/");

  await expect(page).toHaveTitle(/calculadora de precios web/i);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("h1")).toContainText(
    /calcula qué web necesita tu negocio/i,
  );
  await expect(page.locator("body")).toContainText(
    /le metes contenido real a la decisión/i,
  );
  await expect(page.getByText(/calculadora de precios/i).first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: /casos de éxito/i }).first(),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/próximamente/i);
});

test("servicios legacy consolida hacia la ruta canónica", async () => {
  const legacyHtml = fs.readFileSync(
    path.join(process.cwd(), "servicios.html"),
    "utf8",
  );
  const nginxConf = fs.readFileSync(
    path.join(process.cwd(), "nginx/default.conf"),
    "utf8",
  );

  expect(legacyHtml).toContain('content="0; url=/servicios/"');
  expect(legacyHtml).toContain('href="https://webfuengirola.com/servicios/"');
  expect(legacyHtml).toContain("Continuar a /servicios/");
  expect(nginxConf).toContain("location = /servicios.html {");
  expect(nginxConf).toContain("return 301 /servicios/;");
});

test("las imágenes públicas declaran width y height", async () => {
  const htmlFiles = [
    ...fs.readdirSync(process.cwd()).filter((file) => file.endsWith(".html")),
    ...fs
      .readdirSync(path.join(process.cwd(), "blog"))
      .filter((file) => file.endsWith(".html"))
      .map((file) => path.join("blog", file)),
  ];

  const nestedDirs = [
    "blog",
    "casos",
    "contacto",
    "como-trabajamos",
    "diseno-web-fuengirola",
    "diseno-web-malaga",
    "productos",
    "publicidad-ia-fuengirola",
    "publicidad-ia-malaga",
    "recursos",
    "seo-local-fuengirola",
    "seo-local-malaga",
    "servicios",
    "sobre-nosotros",
  ];

  for (const dir of nestedDirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory())
      continue;

    for (const entry of fs.readdirSync(dirPath)) {
      const fullPath = path.join(dirPath, entry);

      if (fs.statSync(fullPath).isDirectory()) {
        const nestedIndex = path.join(fullPath, "index.html");
        if (fs.existsSync(nestedIndex)) {
          htmlFiles.push(path.relative(process.cwd(), nestedIndex));
        }
        continue;
      }

      if (entry.endsWith(".html")) {
        htmlFiles.push(path.relative(process.cwd(), fullPath));
      }
    }
  }

  const uniqueFiles = [...new Set(htmlFiles)].filter(
    (file) => !file.startsWith("saulofitness/"),
  );

  for (const file of uniqueFiles) {
    const html = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    const imgTags = html.match(/<img\b[^>]*>/gms) || [];

    for (const tag of imgTags) {
      expect(tag, `${file} contiene una imagen sin width`).toMatch(/width=/);
      expect(tag, `${file} contiene una imagen sin height`).toMatch(/height=/);
    }
  }
});

test("proceso legacy consolida hacia como-trabajamos", async ({ request }) => {
  const response = await request.get("/proceso.html");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();

  expect(html).toContain('content="0; url=/como-trabajamos/"');
  expect(html).toContain('href="https://webfuengirola.com/como-trabajamos/"');
  expect(html).toContain("Continuar a /como-trabajamos/");
});

test("landings temporales o privadas quedan fuera del índice", async () => {
  const html = fs.readFileSync(
    path.join(process.cwd(), "saulofitness/index.html"),
    "utf8",
  );
  const dockerfile = fs.readFileSync(
    path.join(process.cwd(), "Dockerfile.web"),
    "utf8",
  );

  expect(html).toContain('name="robots"');
  expect(html).toContain("noindex, nofollow");
  expect(dockerfile).not.toContain("/app/saulofitness");
  expect(dockerfile).not.toContain("/app/madamebleuewatches-preview");
  expect(dockerfile).not.toContain("/app/madamebleuewatches-preview-src");
});

test("robots bloquea previews y landings privadas", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBeTruthy();
  const txt = await response.text();

  expect(txt).toContain("Disallow: /madamebleuewatches-preview/");
  expect(txt).toContain("Disallow: /madamebleuewatches-preview-src/");
  expect(txt).toContain("Disallow: /saulofitness/");
});

test("sitemap público solo expone rutas indexables y actuales", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();

  expect(xml).toContain("https://webfuengirola.com/servicios/");
  expect(xml).toContain("https://webfuengirola.com/casos/");
  expect(xml).toContain("https://webfuengirola.com/blog/");
  expect(xml).toContain("https://webfuengirola.com/recursos/");
  expect(xml).toContain("https://webfuengirola.com/contacto/");
  expect(xml).toContain("https://webfuengirola.com/como-trabajamos/");

  expect(xml).not.toContain("https://webfuengirola.com/servicios.html");
  expect(xml).not.toContain("https://webfuengirola.com/proceso.html");
  expect(xml).not.toContain("https://webfuengirola.com/portfolio.html");
  expect(xml).not.toContain("https://webfuengirola.com/portfolio/demo.html");
  expect(xml).not.toContain("https://webfuengirola.com/saulofitness/");
  expect(xml).not.toContain(
    "https://webfuengirola.com/madamebleuewatches-preview/",
  );
  expect(xml).not.toContain(
    "https://webfuengirola.com/madamebleuewatches-preview-src/",
  );
  expect(xml).not.toContain("https://webfuengirola.com/blog/og-blog-home.html");
  expect(xml).not.toContain(
    "https://webfuengirola.com/blog/og-ia-servicios.html",
  );
  expect(xml).not.toContain("https://webfuengirola.com/blog/og-web-2026.html");
});

test("las landings locales prioritarias cargan con title y H1 propios", async ({
  page,
}) => {
  const checks = [
    {
      url: "/diseno-web-fuengirola/",
      title: /diseño web en fuengirola/i,
      heading: /diseño web en fuengirola/i,
    },
    {
      url: "/seo-local-fuengirola/",
      title: /seo local en fuengirola/i,
      heading: /seo local en fuengirola/i,
    },
    {
      url: "/diseno-web-malaga/",
      title: /diseño web en málaga/i,
      heading: /diseño web en málaga/i,
    },
    {
      url: "/seo-local-malaga/",
      title: /seo local en málaga/i,
      heading: /seo local en málaga/i,
    },
    {
      url: "/publicidad-ia-fuengirola/",
      title: /publicidad con ia en fuengirola/i,
      heading: /publicidad con ia en fuengirola/i,
    },
    {
      url: "/publicidad-ia-malaga/",
      title: /publicidad con ia en málaga/i,
      heading: /publicidad con ia en málaga/i,
    },
  ];

  for (const check of checks) {
    await page.goto(check.url);
    await expect(page).toHaveTitle(check.title);
    await expect(
      page.getByRole("heading", { name: check.heading }),
    ).toBeVisible();
  }
});

test("los hubs de diseño web y seo local mantienen intención local clara", async ({
  page,
}) => {
  const checks = [
    {
      url: "/servicios/diseno-web/",
      title: /servicio de diseño web.*web fuengirola/i,
      heading:
        /servicio de diseño web para negocios locales que quieren captar mejor/i,
    },
    {
      url: "/servicios/seo-local/",
      title: /servicio de seo local.*web fuengirola/i,
      heading:
        /servicio de seo local para negocios que necesitan visibilidad real/i,
    },
  ];

  for (const check of checks) {
    await page.goto(check.url);
    await expect(page).toHaveTitle(check.title);
    await expect(
      page.getByRole("heading", { name: check.heading }),
    ).toBeVisible();
  }

  await page.goto("/servicios/diseno-web/");
  await expect(page.locator("body")).toContainText(
    /esta página sirve para entender el servicio general/i,
  );
  await expect(page.locator("body")).toContainText(
    /encaja especialmente bien si ahora mismo te pasa una de estas/i,
  );
  await expect(page.locator("body")).toContainText(/sport massage fuengirola/i);
  await expect(
    page.locator(
      'a.services-routes__link[href="../../diseno-web-fuengirola/"]',
    ),
  ).toBeVisible();
  await expect(
    page.locator('a[href="../../casos/sport-massage-fuengirola/"]').first(),
  ).toBeVisible();
  await expect(
    page
      .locator(
        'a[href="../../blog/cuanto-cuesta-una-pagina-web-en-fuengirola-y-malaga/"]',
      )
      .first(),
  ).toBeVisible();

  await page.goto("/servicios/seo-local/");
  await expect(page.locator("body")).toContainText(
    /esta página sirve para entender el servicio general/i,
  );
  await expect(page.locator("body")).toContainText(
    /encaja especialmente bien si ahora mismo te pasa una de estas/i,
  );
  await expect(page.locator("body")).toContainText(/sport massage fuengirola/i);
  await expect(
    page.locator('a.services-routes__link[href="../../seo-local-fuengirola/"]'),
  ).toBeVisible();
  await expect(
    page
      .locator(
        'a[href="../../blog/como-salir-en-google-maps-en-fuengirola-y-malaga/"]',
      )
      .first(),
  ).toBeVisible();
  await expect(
    page.locator('a[href="../../casos/sport-massage-fuengirola/"]').first(),
  ).toBeVisible();
});

test("sobre nosotros y como trabajamos mantienen branding y confianza claros", async ({
  page,
}) => {
  await page.goto("/sobre-nosotros/");
  await expect(page).toHaveTitle(/sobre nosotros.*web fuengirola/i);
  await expect(
    page.getByRole("heading", { name: /quién hay detrás de web fuengirola/i }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /samuel lleva el planteamiento, el diseño y la parte técnica del proyecto/i,
  );

  await page.goto("/como-trabajamos/");
  await expect(page).toHaveTitle(/cómo trabajamos.*web fuengirola/i);
  await expect(
    page.getByRole("heading", {
      name: /cómo trabajamos para que la web salga clara desde el principio/i,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /sabrás qué se decide, qué necesitas aportar y qué puedes esperar en cada momento/i,
  );
});

test("casos, recursos y blog mantienen branding público consistente", async ({
  page,
}) => {
  await page.goto("/casos/");
  await expect(page).toHaveTitle(/casos de éxito.*web fuengirola/i);
  await expect(
    page.getByRole("heading", {
      name: /casos de éxito de wf-studio en fuengirola/i,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(/sport massage fuengirola/i);
  await expect(page.getByRole("link", { name: /pedir presupuesto/i }).first()).toBeVisible();

  await page.goto("/recursos/");
  await expect(page).toHaveTitle(
    /calculadora de precios web.*web fuengirola/i,
  );
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("h1")).toContainText(
    /calcula qué web necesita tu negocio/i,
  );
  await expect(page.locator("body")).toContainText(
    /si vas a trabajar seo, si te hace falta mantenimiento y qué nivel de seguimiento encaja con tu negocio/i,
  );
  await expect(page.locator("body")).toContainText(
    /la calculadora es para decidir mejor\. cuando ya sabes qué te encaja, lo útil es ir al servicio o ver casos parecidos al tuyo/i,
  );
  await expect(
    page.getByRole("link", { name: /diseño web/i }).first(),
  ).toBeVisible();

  await page.goto("/blog/");
  await expect(page).toHaveTitle(
    /blog de diseño web en fuengirola.*web fuengirola/i,
  );
  await expect(
    page.getByRole("heading", {
      name: /ideas claras para que tu negocio venda mejor online/i,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /si has venido al blog para tomar una decisión, aquí tienes el salto corto/i,
  );
  await expect(
    page.locator('a.services-routes__link[href="../diseno-web-fuengirola/"]'),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /web vs redes sociales para negocio local/i,
  );
  await expect(page.locator("body")).toContainText(
    /cuánto tarda el seo local en dar resultados/i,
  );
  await expect(page.locator("body")).not.toContainText(
    /diseñado por wf studio/i,
  );
});

test("el interior profundo mantiene la marca actualizada", async ({ page }) => {
  await page.goto("/casos/sport-massage-fuengirola/");
  await expect(page).toHaveTitle(
    /caso: sport massage fuengirola.*web fuengirola/i,
  );
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );
  await expect(
    page.locator('img[alt*="caso de éxito de WF-Studio · Web Fuengirola"]').first(),
  ).toBeVisible();

  await page.goto("/recursos/herramientas/");
  await expect(page).toHaveTitle(
    /herramientas gratuitas para negocios.*web fuengirola/i,
  );
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );

  await page.goto("/blog/por-que-crear-una-web-en-2026/");
  await expect(page.locator("body")).not.toContainText(
    /diseñado por wf studio/i,
  );
  await expect(
    page.locator('a.logo[aria-label="WF-Studio · Web Fuengirola"]').first(),
  ).toBeVisible();

  await page.goto("/blog/cuanto-tarda-el-seo-local/");
  await expect(page).toHaveTitle(
    /cuánto tarda el seo local en dar resultados/i,
  );
  await expect(page.locator("body")).toContainText(
    /las señales básicas pueden mejorar rápido, pero la estabilidad tarda más/i,
  );
});

test("servicios secundarios mantienen marca y los productos antiguos redirigen", async ({
  page,
}) => {
  await page.goto("/servicios/mantenimiento/");
  await expect(page).toHaveTitle(/mantenimiento web.*web fuengirola/i);
  await expect(
    page.locator('a.logo[aria-label="WF-Studio · Web Fuengirola"]').first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );

  await page.goto("/productos/lite-blog-wordpress/");
  await expect(page).toHaveURL(/\/precios-diseno-web-fuengirola\/$/);
  await expect(page.getByRole("heading", { name: /precios de diseño web/i }).first()).toBeVisible();
});

test("legal y landings locales mantienen branding actualizado", async ({
  page,
}) => {
  await page.goto("/legal.html");
  await expect(page).toHaveTitle(
    /aviso legal, privacidad y cookies \| web fuengirola/i,
  );
  await expect(
    page.locator('a.logo[aria-label="Web Fuengirola"]').first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(/web fuengirola/i);

  await page.goto("/seo-local-fuengirola/");
  await expect(
    page.locator('a[aria-label="WF-Studio · Web Fuengirola"]').first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /wf-studio crea una presencia coherente entre web y google para negocios que necesitan visibilidad local en fuengirola/i,
  );
});

test("las landings BOFU principales refuerzan modalidades y conversión", async ({
  page,
}) => {
  await page.goto("/diseno-web-fuengirola/");
  await expect(page.locator("body")).toContainText(/Web Lite/i);
  await expect(page.locator("body")).toContainText(/Web Express/i);
  await expect(page.locator("body")).toContainText(/Web Profesional/i);
  await expect(page.getByRole("link", { name: /pedir presupuesto/i }).first()).toBeVisible();

  await page.goto("/seo-local-fuengirola/");
  await expect(page.locator("h1")).toContainText(/SEO local en Fuengirola/i);
  await expect(page.getByRole("link", { name: /auditoría gratuita/i }).first()).toBeVisible();

  await page.goto("/diseno-web-malaga/");
  await expect(page.locator("body")).toContainText(
    /cuando la competencia es más alta, no siempre gana la web más grande/i,
  );
  await expect(page.locator("body")).toContainText(
    /te diremos qué estructura encaja/i,
  );
  await expect(
    page.getByRole("link", { name: /quiero valorar esta opción/i }),
  ).toBeVisible();

  await page.goto("/seo-local-malaga/");
  await expect(page.locator("body")).toContainText(
    /antes de empujar crecimiento local en málaga, hay que decidir si la base ya soporta el trabajo/i,
  );
  await expect(page.locator("body")).toContainText(
    /primero se ve dónde está el cuello de botella/i,
  );
  await expect(
    page.getByRole("link", { name: /quiero valorar este arranque/i }),
  ).toBeVisible();
});
