const { test, expect } = require('@playwright/test');

for (const width of [360, 390, 768, 1440]) {
  test(`original home and visual portfolio work at ${width}px`, async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 844 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    const reject = page.getByRole('button', { name: 'Rechazar', exact: true });
    if (await reject.isVisible()) await reject.click();
    const cover = page.locator('.hero__site-screen--front img');
    await expect(cover).toBeVisible();
    await expect.poll(() => cover.evaluate((img) => img.complete && img.naturalWidth > 0), { timeout: 15000 }).toBe(true);
    await expect(page.locator('.hero--cinematic')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) await page.screenshot({ path: 'output/home-mobile.png' });
    if (width < 1000) {
      await page.locator('#hamburger').click();
      await expect(page.locator('#hamburger')).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#nav')).toHaveCSS('background-color', 'rgb(9, 9, 9)');
      await page.locator('#nav').getByRole('link', { name: 'Portfolio', exact: true }).click();
    } else {
      await page.getByRole('link', { name: 'Ver portfolio', exact: true }).click();
    }
    await expect(page).toHaveURL(/\/casos\/$/);
    await expect(page.locator('h1')).toHaveText('Portfolio');
    const cards = page.locator('.commercial-portfolio .portfolio-card');
    await expect(cards).toHaveCount(9);
    const firstBox = await cards.nth(0).boundingBox();
    const secondBox = await cards.nth(1).boundingBox();
    if (width <= 640) expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height);
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      if (await card.getAttribute('data-reveal')) await expect(card).toHaveClass(/is-revealed/);
      else await expect(card).toBeVisible();
      const image = card.locator('img');
      await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await cards.first().scrollIntoViewIfNeeded();
    if (width === 390) await page.screenshot({ path: 'output/portfolio-mobile.png' });
    await cards.first().locator('.portfolio-card__cover').click();
    await expect(page).toHaveURL(/\/casos\/sport-massage-fuengirola\/$/);
    await expect(page.locator('h1')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('portfolio remains visible with reduced motion and without JavaScript', async ({ browser }) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3466/casos/');
    const first = page.locator('.portfolio-card').first();
    await first.scrollIntoViewIfNeeded();
    await expect(first).toHaveCSS('opacity', '1');
    await context.close();
  }
});


test('restored Services transition animates and arrives at the real page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForTimeout(900);
  await page.locator('#nav a[data-page-transition="services"]').click({ noWaitAfter: true });
  await expect(page.locator('#page-transition')).toHaveClass(/is-active/);
  await expect(page).toHaveURL(/\/servicios\/$/);
  await expect(page.locator('h1')).toBeVisible();
});
