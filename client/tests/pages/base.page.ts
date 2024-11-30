import { Page } from "@playwright/test";

export default class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForRequest(url: string) {
        return this.page.waitForRequest(url);
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

}