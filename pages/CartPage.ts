import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutInfoPage } from "./CheckoutInfoPage";

export class CartPage extends BasePage {
    private cartItemsList = '[data-test="cart-list"]';
    private cartItem = '[data-test="inventory-item"]';
    private checkoutButton = '[data-test="checkout"]';
    private removeButtonPrefix = '[data-test="remove-';

    // new cartPage Instance
    constructor(page: Page) {
        super(page);
    }

    // check if cartPage is loaded
    async isLoaded(): Promise<boolean> {
        return await this.isElementVisible(this.cartItemsList);
    }

    // Get the number of items in the cart
    async getCartItemCount(): Promise<number> {
        return await this.page.locator(this.cartItem).count();
    }

    // Remove an item from the cart by item ID
    async removeItemFromCart(itemId: string): Promise<void> {
        const removeButton = `${this.removeButtonPrefix}${itemId}"]`;
        await this.page.click(removeButton);
    }

    // checkout
    async checkout(): Promise<CheckoutInfoPage> {
        await this.page.click(this.checkoutButton);
        return new CheckoutInfoPage(this.page);
    }
}
