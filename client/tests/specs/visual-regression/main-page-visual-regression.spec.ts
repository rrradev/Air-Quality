import { test, expect } from '../setup';

test('visual regression test', async ({ mainPage }) => {
  await expect(mainPage.pmChart.loadingOverlay).not.toBeVisible();
  await expect(mainPage.tempChart.loadingOverlay).not.toBeVisible();
  expect(await mainPage.page.screenshot({
    mask: [mainPage.page.locator('canvas'),
    mainPage.page.locator('.dropdown')
    ]
  })).toMatchSnapshot();
});