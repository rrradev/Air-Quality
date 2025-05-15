import MainPage from '../pages/main.page';
import { test, expect } from './setup';

test('has correct title', async ({ mainPage }) => {
  await expect(mainPage.navBarLink).toHaveText("Air Quality");
});

type RangeTestCase = {
  buttonLabel: string,
  rangeLabel: string,
  query: string,
  isExtended?: boolean,
};

const ranges: RangeTestCase[] = [
  { buttonLabel: '1h', rangeLabel: 'hour', query: '?hours=1' },
  { buttonLabel: '3h', rangeLabel: '3 hours', query: '?hours=3' },
  { buttonLabel: '12h', rangeLabel: '12 hours', query: '?hours=12' },
  { buttonLabel: '1d', rangeLabel: 'day', query: '?hours=24' },
  { buttonLabel: '1w', rangeLabel: 'week', query: '?days=7' },
  { buttonLabel: '1m', rangeLabel: 'month', query: '?days=30', isExtended: true },
  { buttonLabel: '3m', rangeLabel: '3 months', query: '?days=90', isExtended: true },
  { buttonLabel: '6m', rangeLabel: '6 months', query: '?days=180', isExtended: true },
  { buttonLabel: '1y', rangeLabel: 'year', query: '?days=365', isExtended: true }
];

test.describe.parallel('PM Chart ranges tests', () => {
  ranges.forEach(range => {
    test(`Display data for ${range.buttonLabel} range`, async ({ page }) => {
      const mainPage = new MainPage(page);
      let callCount = 0;

      page.on('request', (req) => {
        if (req.url().includes(range.query)) {
          callCount++;
        }
      });

      if (range.isExtended) {
        await mainPage.mock('**/api/available-extended-ranges',
          {
            status: 200,
            body: JSON.stringify({ ranges: [range.buttonLabel] }),
          }
        );
      }

      await mainPage.open();

      if (range.buttonLabel !== '1d') {
        await mainPage.pmChart.selectRange(range.buttonLabel);
      }

      await expect(mainPage.pmChart.chartTitle).toHaveText(`Particulate matter over the last ${range.rangeLabel}`);
      await expect(mainPage.pmChart.loadingOverlay).not.toBeVisible();
      expect(callCount, `calls to /api/date${range.query} NOT as expected`).toBe(1);
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
  await pmChart.weekButton.click();

  await expect(pmChart.loadingOverlay).not.toBeVisible();
});

test('404 page is displayed if invalid URL is entered', async ({ mainPage, _404Page }) => {
  await mainPage.goto('/no-such-page');
  await expect(_404Page.notFoundImage).toBeVisible();
  await expect(_404Page.notFoundMessage).toContainText('The requested URL was not found.');
});

test('should call /api/data?hours=24 only once upon initial load', async ({ page }) => {
  const apiUrl = '/api/data?hours=24';
  const mainPage = new MainPage(page);
  let callCount = 0;

  page.on('request', (request) => {
    if (request.url().includes(apiUrl)) {
      callCount++;
    }
  });

  await page.goto('/');
  await expect(mainPage.pmChart.loadingOverlay).not.toBeVisible();
  await expect(mainPage.tempChart.loadingOverlay).not.toBeVisible();
  await page.waitForTimeout(500);
  expect(callCount).toBe(1);
});
