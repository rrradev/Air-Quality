import { test as base } from '@playwright/test';
import MainPage from '../pages/main.page';
import _404Page from '../pages/_404.page';

type MyFixtures = {
    mainPage: MainPage;
    _404Page: _404Page;
};

export const test = base.extend<MyFixtures>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await mainPage.open();

        await use(mainPage);
    },

    _404Page: async ({ page }, use) => {
        await use(new _404Page(page));
    },
});

export { expect } from '@playwright/test';