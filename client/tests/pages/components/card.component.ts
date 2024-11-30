import { Locator } from "@playwright/test";


export default class Card {
    cardText: Locator;

    constructor($: Locator) {
        this.cardText = $.locator('.card-text');
    }
}

