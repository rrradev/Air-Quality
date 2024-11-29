const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has correct title', async ({ page }) => {
  const navBarLink = page.locator('.navbar-brand');

  await expect(navBarLink).toHaveText("Air Quality");
});

test('pm chart is displayed', async ({ page }) => {
  const _1hButton = page.getByRole('button', { name: '1h' }).first();
  const chartTitle = page.locator('.title-text').first();
  const requestPromise = page.waitForRequest('**/api/data?hours=1');

  await _1hButton.click();
  await requestPromise;

  await expect(chartTitle).toHaveText("Particulate matter over the last hour");
});

test('error toast and loading indicator are displayed when it fails to fetch data', async ({ page }) => {
  await page.route('**/api/data**', (route) => route.abort());
  await page.goto('/');

  const _1hButton = page.getByRole('button', { name: '1h' }).first();
  const errorToast = page.locator('#error');
  const cardText = page.locator('.card-text').first();
  const loadingOverlay = page.getByTestId('overlay').first();

  await _1hButton.click();

  await expect(errorToast).toHaveText(/NetworkError|Load failed|Failed to fetch/);
  await expect(cardText).toContainText('----');
  await page.waitForTimeout(7000);
  await expect(loadingOverlay).toBeVisible();
});

test('loading indicator disappears when the network is restored', async ({ page }) => {
  const _1hButton = page.getByRole('button', { name: '1h' }).first();
  const loadingOverlay = page.getByTestId('overlay').first();

  await page.route('**/api/data**', (route) => route.abort());
  await page.goto('/');
  await _1hButton.click();
  await page.unroute('**/api/data**');
  await page.goto('/');

  await expect(loadingOverlay).not.toBeVisible();
});

test('404 page is displayed if invalid URL is entered', async ({ page }) => {
  await page.goto('/not-such-page');

  const _404Image = page.locator('img[src="/icons/404.png"]');
  const message = page.locator('.title-text');

  await expect(_404Image).toBeVisible();
  await expect(message).toContainText('The requested URL was not found.');
});


