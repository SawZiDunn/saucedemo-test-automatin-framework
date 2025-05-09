import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
    private checkoutCompleteContainer =
        '[data-test="checkout-complete-container"]';
    private completeHeader = '[data-test="complete-header"]';
    private completeText = '[data-test="complete-text"]';

    constructor(page: Page) {
        super(page);
    }

    // Check if the checkout complete page is loaded
    async isLoaded(): Promise<boolean> {
        return await this.isElementVisible(this.checkoutCompleteContainer);
    }

    // Get the confirmation header text
    async getConfirmationHeader(): Promise<string | null> {
        return await this.getTextContent(this.completeHeader);
    }

    // Get the confirmation text
    async getConfirmationText(): Promise<string | null> {
        return await this.getTextContent(this.completeText);
    }
}
