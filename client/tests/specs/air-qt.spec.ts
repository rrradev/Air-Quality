import MainPage from '../pages/main.page';
import { test, expect } from './setup';

test('has correct title', async ({ mainPage }) => {
  await expect(mainPage.navBarLink).toHaveText("Air Quality");
});

const ranges = [
  ['hour', '?hours=1'],
  ['3 hours', '?hours=3'],
  ['12 hours', '?hours=12'],
  ['day', '?hours=24'],
  ['week', '?days=7&groupByHour=true'],
  ['month', '?days=30&groupByHour=true']
];

test.describe.parallel('Chart ranges tests', () => {
  ranges.forEach(([buttonLabel, queries]) => {
    test(`Display data for ${buttonLabel} range`, async ({ page }) => {
      let callCount = 0;
      page.on('request', (request) => {
        if (request.url().includes(queries)) {
          callCount++;
        }
      });
      const mainPage = new MainPage(page);
      await mainPage.goto('/');

      if (buttonLabel !== 'day') {
        await mainPage.pmChart.clickButton(buttonLabel);
      }

      await expect(mainPage.pmChart.chartTitle).toHaveText(`Particulate matter over the last ${buttonLabel}`);
      expect(callCount).toBe(1);
    });
  });
});

test('error toast and loading indicator are displayed when it fails to fetch data', async ({ mainPage }) => {
  const pmChart = mainPage.pmChart;
  const pmCard = mainPage.pmCard;

  await mainPage.page.route('**/api/data**', (route) => route.abort());
  await mainPage.open();
  await pmChart.oneHourButton.click();

  await expect(mainPage.errorToast).toHaveText(/NetworkError|Load failed|Failed to fetch/);
  await expect(pmCard.cardText).toContainText('----');
  await mainPage.page.waitForTimeout(7000);
  await expect(pmChart.loadingOverlay).toBeVisible();
});

test('loading indicator disappears when data is fetched', async ({ mainPage }) => {
  const pmChart = mainPage.pmChart;

  await mainPage.page.route('**/api/data**', (route) => route.abort());
  await mainPage.open();
  await pmChart.oneHourButton.click();
  await mainPage.page.unroute('**/api/data**');
  await pmChart.oneMonthButton.click();

  await expect(pmChart.loadingOverlay).not.toBeVisible();
});

test('404 page is displayed if invalid URL is entered', async ({ mainPage, _404Page }) => {
  await mainPage.goto('/not-such-page');

  await expect(_404Page.notFoundImage).toBeVisible();
  await expect(_404Page.notFoundMessage).toContainText('The requested URL was not found.');
});
