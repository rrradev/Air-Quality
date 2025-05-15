import { Locator } from "@playwright/test";

export default class BaseComponent {
    $: Locator;

    constructor($: Locator) {
        this.$ = $;
    }
}
