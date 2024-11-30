import { Locator } from "@playwright/test";

export default class Chart {
    chartTitle: Locator;
    _1hButton: Locator;
    loadingOverlay: Locator;

    constructor($: Locator) {
        this.chartTitle = $.locator('.title-text');
        this._1hButton = $.getByRole('button', { name: '1h' });
        this.loadingOverlay = $.getByTestId('overlay');
    }
}

