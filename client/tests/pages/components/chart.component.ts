import { Locator } from "@playwright/test";

export default class Chart {
    chartTitle: Locator;
    oneHourButton: Locator;
    threeHourButton: Locator;
    twelveHourButton: Locator;
    dayButton: Locator;
    weekButton: Locator;
    loadingOverlay: Locator;

    constructor($: Locator) {
        this.chartTitle = $.locator('.title-text');
        this.oneHourButton = $.getByRole('button', { name: '1h' });
        this.threeHourButton = $.getByRole('button', { name: '3h' });
        this.twelveHourButton = $.getByRole('button', { name: '12h' });
        this.dayButton = $.getByRole('button', { name: '1d' });
        this.weekButton = $.getByRole('button', { name: '1w' });
        this.loadingOverlay = $.getByTestId('overlay');
    }

    async clickButton(label = 'hour') {
        const buttons = {
            week: this.weekButton,
            '12 hours': this.twelveHourButton,
            '3 hours': this.threeHourButton,
            hour: this.oneHourButton,
            day: this.dayButton,
        };

        const button = buttons[label];

        if (!button) {
            throw new Error(`No such button: ${label}`);
        }

        await button.click();
    }
}

