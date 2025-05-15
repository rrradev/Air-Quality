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
        try {
            await this.page.goto(url, { timeout: 5000 });
        } catch {

        }
    }

    async mock(url: string | RegExp,
        res: {
            body: string | Buffer,
            status?: number,
            contentType?: string,
        }
    ) {
        await this.page.route(url, async route => {
            route.fulfill({
                status: res.status ?? 200,
                body: res.body,
                contentType: res.contentType ?? 'application/json',
            });
        });
    }
}
