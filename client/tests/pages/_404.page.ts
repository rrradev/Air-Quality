import { Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

export default class _404Page extends BasePage {
    notFoundImage: Locator;
    notFoundMessage: Locator;

    constructor(page: Page) {
        super(page)
        this.notFoundImage = page.locator('img[src="/icons/404.png"]');
        this.notFoundMessage = page.locator('.title-text');
    }

}
