import { test, expect } from '../setup';

test('visual regression test', async ({ mainPage }, testInfo) => {
  const name = `mainPage-${testInfo.project.name}.png`;
  
  await expect(mainPage.pmChart.loadingOverlay).not.toBeVisible();
  await expect(mainPage.tempChart.loadingOverlay).not.toBeVisible();
  expect(await mainPage.page.screenshot({mask: [mainPage.page.locator('canvas')]})).toMatchSnapshot(`playwright/snapshots/${name}`);
});