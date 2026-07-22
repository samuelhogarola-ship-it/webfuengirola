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

test("las páginas comerciales no arrastran selector de idioma residual", async ({
  page,
}) => {
  const urls = [
    "/",
    "/servicios/",
    "/servicios/diseno-web/",
    "/servicios/seo-local/",
    "/contacto/",
    "/sobre-nosotros/",
    "/como-trabajamos/",
    "/casos/",
    "/recursos/",
  ];

  for (const url of urls) {
    await page.goto(url);
    await expect(page.locator(".lang-switcher")).toHaveCount(0);
  }
});

test("landing muestra los botones principales del hero", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /pedir presupuesto/i }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /ver servicios/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /esto funciona especialmente bien para negocios/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /preguntas normales antes de encargar una web/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /las dudas que más suelen frenar una web buena casi nunca son técnicas/i,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /lo principal para la mayoría/i,
  );
  await expect(page.locator("body")).toContainText(/si el proyecto lo pide/i);
  await expect(page.locator("body")).toContainText(
    /casi siempre lo sensato empieza por una web clara/i,
  );
  await expect(page.locator("body")).toContainText(
    /elige la forma más fácil[\s\S]*dar el siguiente paso/i,
  );
  await expect(
    page.getByRole("link", { name: /ir a diseño web/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /ir a seo local/i }),
  ).toBeVisible();
  await expect(page.locator("h1")).toContainText(/diseño web en fuengirola/i);
  await expect(
    page.locator(".services-home-card--spotlight .portfolio-card__title"),
  ).toHaveText(/servicio de diseño web para negocio local/i);
  await expect(
    page.getByRole("heading", { name: /seo local/i }).first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /mantenimiento, hosting, automatización o apps no deberían robar el foco al principio/i,
  );
  await expect(
    page.getByRole("heading", {
      name: /qué suele cambiar cuando la web ya está bien planteada/i,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /si ya vienes con una búsqueda mucho más cerrada/i,
  );
  await expect(
    page.getByRole("heading", {
      name: /una web bien planteada no empieza por el diseño/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /la idea no es enseñar “otra web”, sino el tipo de salida que encaja según lo que necesitas/i,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /un pc con una web clara, legible y preparada para convertir/i,
  );
  await expect(page.locator("body")).toContainText(
    /un móvil con una app o flujo operativo, no con la portada de otra web/i,
  );
  await expect(page.locator("body")).toContainText(
    /una pieza de visibilidad: búsqueda, mapa y posición útil/i,
  );
  await expect(page.locator("body")).toContainText(
    /no quiero meterme en una web enorme/i,
  );
  await expect(page.locator("body")).toContainText(
    /sin pasar por comerciales ni capas innecesarias/i,
  );
  await expect(
    page.getByRole("heading", {
      name: /si nos escribes, no entras en un embudo raro/i,
    }),
  ).toBeVisible();
  await expect(page.locator(".client-access-btn")).toHaveCount(0);
  await expect(page.locator(".lang-switcher")).toHaveCount(0);
  await expect(page.locator("body")).toContainText(
    /samuel lleva el planteamiento, el diseño y la parte técnica del proyecto/i,
  );
  await expect(
    page.getByRole("link", { name: /ver quién hay detrás/i }),
  ).toBeVisible();
  await expect(
    page.locator('.services-routes__link[href="diseno-web-fuengirola/"]'),
  ).toBeVisible();
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
      name: /servicios web en fuengirola para negocios que quieren vender mejor online/i,
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
  await expect(page.locator("body")).toContainText(
    /diseño web, seo local, mantenimiento, automatización útil y herramientas a medida/i,
  );
  await expect(page.locator("body")).toContainText(
    /qué ruta suele encajar según el problema que tienes hoy/i,
  );
  await expect(page.locator("body")).toContainText(
    /la mayoría de negocios no necesitan “todos los servicios”/i,
  );
  await expect(page.locator("body")).toContainText(
    /lo que más suele preguntar un negocio antes de contratar/i,
  );
  await expect(
    page.getByRole("link", { name: /ir a contacto/i }),
  ).toBeVisible();
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

  await expect(page).toHaveTitle(/contacto \| web fuengirola/i);
  await expect(
    page.getByRole("heading", { name: /cuéntanos qué necesita tu negocio/i }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /fuengirola, mijas, benalmádena y málaga/i,
  );
  await expect(page.locator("body")).toContainText(
    /respondemos en menos de 24h/i,
  );
  await expect(page.locator("body")).toContainText(
    /encaja especialmente bien si ahora mismo estás en uno de estos puntos/i,
  );
  await expect(
    page.getByRole("link", { name: /escribir por whatsapp/i }),
  ).toBeVisible();
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
      title: /servicio de diseño web \| web fuengirola/i,
      heading:
        /servicio de diseño web para negocios locales que quieren captar mejor/i,
    },
    {
      url: "/servicios/seo-local/",
      title: /servicio de seo local \| web fuengirola/i,
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
  await expect(page).toHaveTitle(/sobre nosotros \| web fuengirola/i);
  await expect(
    page.getByRole("heading", { name: /quién hay detrás de web fuengirola/i }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /samuel lleva el planteamiento, el diseño y la parte técnica del proyecto/i,
  );

  await page.goto("/como-trabajamos/");
  await expect(page).toHaveTitle(/cómo trabajamos \| web fuengirola/i);
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
  await expect(page).toHaveTitle(/casos de éxito \| web fuengirola/i);
  await expect(
    page.getByRole("heading", {
      name: /negocios reales, resultados concretos/i,
    }),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );
  await expect(page.locator("body")).toContainText(
    /calcula qué web necesita tu negocio\s*después de ver los casos/i,
  );

  await page.goto("/recursos/");
  await expect(page).toHaveTitle(
    /calculadora de precios web \| web fuengirola/i,
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
    /blog de diseño web en fuengirola \| web fuengirola/i,
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
    /caso: sport massage fuengirola \| web fuengirola/i,
  );
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );
  await expect(
    page.locator('img[alt*="caso de éxito de Web Fuengirola"]').first(),
  ).toBeVisible();

  await page.goto("/recursos/herramientas/");
  await expect(page).toHaveTitle(
    /herramientas gratuitas para negocios \| web fuengirola/i,
  );
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );

  await page.goto("/blog/por-que-crear-una-web-en-2026/");
  await expect(page.locator("body")).not.toContainText(
    /diseñado por wf studio/i,
  );
  await expect(
    page.locator('a.logo[aria-label="Web Fuengirola"]').first(),
  ).toBeVisible();

  await page.goto("/blog/cuanto-tarda-el-seo-local/");
  await expect(page).toHaveTitle(
    /cuánto tarda el seo local en dar resultados/i,
  );
  await expect(page.locator("body")).toContainText(
    /las señales básicas pueden mejorar rápido, pero la estabilidad tarda más/i,
  );
});

test("servicios secundarios y productos mantienen branding consistente", async ({
  page,
}) => {
  await page.goto("/servicios/mantenimiento/");
  await expect(page).toHaveTitle(/mantenimiento web \| web fuengirola/i);
  await expect(
    page.locator('a.logo[aria-label="Web Fuengirola"]').first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );

  await page.goto("/productos/lite-blog-wordpress/");
  await expect(page).toHaveTitle(
    /ejemplos de lite \+ blog wordpress \| web fuengirola/i,
  );
  await expect(
    page.locator('a.logo[aria-label="Web Fuengirola"]').first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /webs, seo local y automatización para negocios locales en la costa del sol/i,
  );
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
  await expect(page.locator("body")).not.toContainText(/wf studio/i);

  await page.goto("/seo-local-fuengirola/");
  await expect(
    page.locator('a.logo[aria-label="Web Fuengirola"]').first(),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText(
    /diseño web en fuengirola para negocios locales que necesitan una presencia clara, rápida y preparada para captar mejor|webs para comercios locales con una presencia clara y profesional/i,
  );
});

test("las landings BOFU principales refuerzan decisión y arranque comercial", async ({
  page,
}) => {
  await page.goto("/diseno-web-fuengirola/");
  await expect(page.locator("body")).toContainText(
    /no hace falta elegir “la web más grande”/i,
  );
  await expect(page.locator("body")).toContainText(
    /te diremos qué formato encaja/i,
  );
  await expect(page.locator("body")).toContainText(
    /las dudas que más frenan aquí suelen ser de alcance, no de diseño/i,
  );
  await expect(
    page.getByRole("link", { name: /quiero esta opción/i }),
  ).toBeVisible();

  await page.goto("/seo-local-fuengirola/");
  await expect(page.locator("body")).toContainText(
    /antes de prometer posiciones, hay que decidir si toca ordenar la base/i,
  );
  await expect(page.locator("body")).toContainText(
    /primero se audita el punto de partida/i,
  );
  await expect(page.locator("body")).toContainText(
    /las dudas que frenan el seo local suelen ser de base y de tiempos, no de herramientas/i,
  );
  await expect(
    page.getByRole("link", { name: /quiero valorar este arranque/i }),
  ).toBeVisible();

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
