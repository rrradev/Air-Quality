import { test, expect } from './setup';

test('has correct title', async ({ mainPage }) => {
  await expect(mainPage.navBarLink).toHaveText("Air Quality");
});

test('pm chart is displayed', async ({ mainPage }) => {
  const requestPromise = mainPage.waitForRequest('**/api/data?hours=1');
  const pmChart = mainPage.pmChart;

  await pmChart.oneHourButton.click();
  await requestPromise;

  await expect(pmChart.chartTitle).toHaveText("Particulate matter over the last hour");
});

test('error toast and loading indicator are displayed when it fails to fetch data', async ({ mainPage, page }) => {
  const pmChart = mainPage.pmChart;
  const pmCard = mainPage.pmCard;

  await page.route('**/api/data**', (route) => route.abort());
  await mainPage.open();
  await pmChart.oneHourButton.click();

  await expect(mainPage.errorToast).toHaveText(/NetworkError|Load failed|Failed to fetch/);
  await expect(pmCard.cardText).toContainText('----');
  await page.waitForTimeout(7000);
  await expect(pmChart.loadingOverlay).toBeVisible();
});

test('loading indicator disappears when data is fetched', async ({ mainPage, page }) => {
  const pmChart = mainPage.pmChart;

  await page.route('**/api/data**', (route) => route.abort());
  await mainPage.open();
  await pmChart.oneHourButton.click();
  await page.unroute('**/api/data**');
  await pmChart.oneMonthButton.click();

  await expect(pmChart.loadingOverlay).not.toBeVisible();
});

test('404 page is displayed if invalid URL is entered', async ({ mainPage, _404Page }) => {
  await mainPage.goto('/not-such-page');

  await expect(_404Page.notFoundImage).toBeVisible();
  await expect(_404Page.notFoundMessage).toContainText('The requested URL was not found.');
});

