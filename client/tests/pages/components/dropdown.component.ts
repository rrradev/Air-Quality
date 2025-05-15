import { Locator } from "@playwright/test";
import BaseComponent from "./base.component";


export default class Dropdown extends BaseComponent {
    toggle: Locator;

    constructor($: Locator) {
        super($);
        this.toggle = $.locator('.dropdown-toggle');
    }

    async selectItem(item: string) {
        await this.toggle.click();
        await this.$.locator('.dropdown-item', { hasText: item }).click();
    }
}

