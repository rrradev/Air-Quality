import { Locator } from "@playwright/test";

export default class Chart {
    chartTitle: Locator;
    oneHourButton: Locator;
    oneMonthButton: Locator; 
    loadingOverlay: Locator;

    constructor($: Locator) {
        this.chartTitle = $.locator('.title-text');
        this.oneHourButton = $.getByRole('button', { name: '1h' });
        this.oneMonthButton = $.getByRole('button', { name: '1m' });
        this.loadingOverlay = $.getByTestId('overlay');
    }
}

