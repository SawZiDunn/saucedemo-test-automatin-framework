import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutCompletePage } from "./CheckoutCompletePage";

export class CheckoutOverviewPage extends BasePage {
    private summaryContainer = '[data-test="checkout-summary-container"]';
    private summarySubtotal = '[data-test="subtotal-label"]';
    private summaryTax = '[data-test="tax-label"]';
    private summaryTotal = '[data-test="total-label"]';
    private finishButton = '[data-test="finish"]';
    private inventoryItem = '[data-test="inventory-item"]';

    constructor(page: Page) {
        super(page);
    }

    // Check if the checkout overview page is loaded
    async isLoaded(): Promise<boolean> {
        return await this.isElementVisible(this.summaryContainer);
    }

    // Get the subtotal amount
    async getSubtotal(): Promise<string | null> {
        return await this.getTextContent(this.summarySubtotal);
    }

    // Get the tax amount
    async getTax(): Promise<string | null> {
        return await this.getTextContent(this.summaryTax);
    }

    // Get the total amount
    async getTotal(): Promise<string | null> {
        return await this.getTextContent(this.summaryTotal);
    }

    // Get the number of items in the order
    async getItemCount(): Promise<number> {
        return await this.page.locator(this.inventoryItem).count();
    }

    // Click the finish button to complete the order
    async finishCheckout(): Promise<CheckoutCompletePage> {
        await this.page.click(this.finishButton);
        return new CheckoutCompletePage(this.page);
    }
}
