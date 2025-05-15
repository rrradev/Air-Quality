import { Locator } from "@playwright/test";
import Dropdown from "./dropdown.component";

export default class Chart {
    chartTitle: Locator;
    oneHourButton: Locator;
    threeHourButton: Locator;
    twelveHourButton: Locator;
    dayButton: Locator;
    weekButton: Locator;
    loadingOverlay: Locator;
    extendedRangeDropdown: Dropdown;

    constructor($: Locator) {
        this.chartTitle = $.locator('.title-text');
        this.oneHourButton = $.getByRole('button', { name: '1h' });
        this.threeHourButton = $.getByRole('button', { name: '3h' });
        this.twelveHourButton = $.getByRole('button', { name: '12h' });
        this.dayButton = $.getByRole('button', { name: '1d' });
        this.weekButton = $.getByRole('button', { name: '1w' });
        this.loadingOverlay = $.getByTestId('overlay');
        this.extendedRangeDropdown = new Dropdown($.locator('.dropdown'));
    }

    async selectRange(label = '1d') {
        const defaultActions = {
            '1w': () => this.weekButton.click(),
            '12h': () => this.twelveHourButton.click(),
            '3h': () => this.threeHourButton.click(),
            '1h': () => this.oneHourButton.click(),
            '1d': () => this.dayButton.click(),
        };

        const action = defaultActions[label] || (
            () => this.extendedRangeDropdown.selectItem(label)
        );

        await action();
    }
}

