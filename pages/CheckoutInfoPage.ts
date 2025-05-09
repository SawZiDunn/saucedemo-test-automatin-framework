// src/pages/CheckoutInfoPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutOverviewPage } from "./CheckoutOverviewPage";

export class CheckoutInfoPage extends BasePage {
    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private continueButton = '[data-test="continue"]';
    private checkoutInfoContainer = '[data-test="checkout-info-container"]';

    constructor(page: Page) {
        super(page);
    }

    // check if checkoutInfoPage is loaded
    async isLoaded() {
        return await this.isElementVisible(this.checkoutInfoContainer);
    }

    // fill checkout info
    private async fillCheckoutInfo(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
    }

    // go to checkoutOverView Page
    private async clickContinue(): Promise<CheckoutOverviewPage> {
        await this.page.click(this.continueButton);
        return new CheckoutOverviewPage(this.page);
    }

    // Fill checkout info and continue
    async completeCheckoutInfo(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<CheckoutOverviewPage> {
        await this.fillCheckoutInfo(firstName, lastName, postalCode);
        return await this.clickContinue();
    }
}
