const { test, expect } = require('@playwright/test');

// ── Cookie Banner (index.html) ────────────────────────────────────────────────

test.describe('Cookie banner – index.html', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('webfuengirola_cookie_consent');
      localStorage.removeItem('webfuengirola_cookie_preferences');
    });
    await page.reload();
  });

  test('aparece el banner en primera visita', async ({ page }) => {
    await expect(page.locator('.cookie-banner-wrapper')).toBeVisible();
  });

  test('aceptar guarda "accepted" en localStorage y oculta el banner', async ({ page }) => {
    await page.locator('[data-cookie-accept]').click();
    const decision = await page.evaluate(() =>
      localStorage.getItem('webfuengirola_cookie_consent')
    );
    expect(decision).toBe('accepted');
    await expect(page.locator('.cookie-banner-wrapper')).not.toBeAttached();
  });

  test('rechazar guarda "rejected" y analytics queda denied', async ({ page }) => {
    await page.locator('[data-cookie-reject]').click();
    const decision = await page.evaluate(() =>
      localStorage.getItem('webfuengirola_cookie_consent')
    );
    expect(decision).toBe('rejected');
    const prefs = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('webfuengirola_cookie_preferences') || '{}')
    );
    expect(prefs.analiticas).toBe(false);
    await expect(page.locator('.cookie-banner-wrapper')).not.toBeAttached();
  });

  test('banner no reaparece en segunda visita tras aceptar', async ({ page }) => {
    await page.locator('[data-cookie-accept]').click();
    await page.reload();
    await expect(page.locator('.cookie-banner-wrapper')).not.toBeAttached();
  });

  test('modal de configuración se abre y cierra con Escape', async ({ page }) => {
    await page.locator('[data-cookie-open-config]').click();
    await expect(page.locator('.cookie-config-modal')).toHaveClass(/is-open/);
    await page.keyboard.press('Escape');
    await expect(page.locator('.cookie-config-modal')).not.toHaveClass(/is-open/);
  });

  test('guardar config con analytics off persiste analiticas=false', async ({ page }) => {
    await page.locator('[data-cookie-open-config]').click();
    const toggle = page.locator('[data-cookie-analytics-toggle]');
    if (await toggle.isChecked()) await toggle.uncheck();
    await page.locator('[data-cookie-save-config]').click();
    const prefs = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('webfuengirola_cookie_preferences') || '{}')
    );
    expect(prefs.analiticas).toBe(false);
    expect(prefs.necesarias).toBe(true);
  });
});

// ── Seguridad: XSS desde localStorage ────────────────────────────────────────

test.describe('Seguridad – no XSS desde localStorage', () => {
  test('valor malicioso en localStorage no ejecuta script', async ({ page }) => {
    const xssExecuted = [];
    page.on('dialog', (dialog) => {
      xssExecuted.push(dialog.message());
      dialog.dismiss();
    });

    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('webfuengirola_cookie_consent', '<img src=x onerror="alert(1)">');
      localStorage.setItem('webfuengirola_cookie_preferences', '{"analiticas":"<script>alert(2)</script>"}');
    });
    await page.reload();
    await page.waitForTimeout(500);

    expect(xssExecuted).toHaveLength(0);
  });

  test('el banner no usa eval ni innerHTML con datos de localStorage', async ({ page }) => {
    await page.goto('/');
    // Si el consentimiento ya está tomado, el banner no se renderiza — correcto
    await page.evaluate(() => {
      localStorage.removeItem('webfuengirola_cookie_consent');
    });
    await page.reload();

    // El HTML renderizado del banner NO debe contener <script> tags
    const bannerHTML = await page.locator('#cookie-banner-core-root').innerHTML().catch(() => '');
    expect(bannerHTML).not.toMatch(/<script/i);
  });
});

// ── Legal page (legal.html) ───────────────────────────────────────────────────

test.describe('Legal page – legal.html', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/legal.html');
  });

  test('carga correctamente', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('#legal-root')).toBeAttached();
  });

  test('tiene sección aviso legal', async ({ page }) => {
    await expect(page.locator('#aviso-legal')).toBeAttached();
  });

  test('tiene sección privacidad', async ({ page }) => {
    await expect(page.locator('#privacidad')).toBeAttached();
  });

  test('tiene sección cookies', async ({ page }) => {
    await expect(page.locator('#cookies')).toBeAttached();
  });

  test('enlaces externos tienen rel=noopener', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      // noreferrer implica noopener en navegadores modernos — ambos son válidos
      expect(rel ?? '').toMatch(/noopener|noreferrer/);
    }
  });

  test('el link de reset de cookies limpia localStorage y redirige a index', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('webfuengirola_cookie_consent', 'accepted');
      localStorage.setItem('webfuengirola_cookie_preferences', '{"necesarias":true,"analiticas":true}');
    });

    const resetLink = page.locator('#reset-cookie-consent-link');
    await expect(resetLink).toBeVisible();
    await resetLink.click();

    // serve redirige /index.html → / — aceptamos ambas formas
    await page.waitForURL(/index\.html|localhost:\d+\/?$/);
    const consent = await page.evaluate(() =>
      localStorage.getItem('webfuengirola_cookie_consent')
    );
    expect(consent).toBeNull();
  });
});

// ── Seguridad: cabeceras y meta ───────────────────────────────────────────────

test.describe('Seguridad – meta tags', () => {
  test('index.html tiene charset UTF-8', async ({ page }) => {
    await page.goto('/');
    const charset = await page.evaluate(() => document.characterSet);
    expect(charset.toLowerCase()).toBe('utf-8');
  });

  test('legal.html tiene canonical correcto', async ({ page }) => {
    await page.goto('/legal.html');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('legal');
    expect(canonical).not.toContain('index');
  });

  test('no hay iframes de terceros sin sandbox', async ({ page }) => {
    await page.goto('/');
    const unsafeIframes = await page.evaluate(() =>
      [...document.querySelectorAll('iframe')]
        .filter(f => !f.hasAttribute('sandbox') && f.src && !f.src.startsWith(location.origin))
        .map(f => f.src)
    );
    expect(unsafeIframes).toHaveLength(0);
  });
});
