import { Locator, Page } from "@playwright/test";
import BasePage from "./base.page";
import Chart from "./components/chart.component";
import Card from "./components/card.component";

export default class MainPage extends BasePage {
    navBarLink: Locator;
    pmCard: Card;
    pmChart: Chart;
    errorToast: Locator;

    constructor(page: Page) {
        super(page)
        this.navBarLink = page.locator('.navbar-brand');
        this.pmChart = new Chart(page.locator('.chart-container').first());
        this.pmCard = new Card(page.locator('#pm25'));
        this.errorToast = page.locator('#error');
    }

    async open() {
        await this.page.goto('/');
    }
}
