import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartPage } from "./CartPage";

export class InventoryPage extends BasePage {
    private title = '[data-test="title"]';
    private inventoryContainer = '[data-test="inventory-container"]';
    private shoppingCartLink = '[data-test="shopping-cart-link"]';
    private inventoryItem = '[data-test="inventory-item"]';
    private addToCartButtonPrefix = '[data-test="add-to-cart-';

    // creates new inventory page instance
    constructor(page: Page) {
        super(page);
    }

    // Check if the page is loaded
    async isLoaded(): Promise<boolean> {
        return await this.isElementVisible(this.inventoryContainer);
    }

    // Check if the title is visible
    async isTitleVisible(): Promise<boolean> {
        return await this.isElementVisible(this.title);
    }

    // Check if the shopping cart icon is visible
    async isShoppingCartVisible(): Promise<boolean> {
        return await this.isElementVisible(this.shoppingCartLink);
    }

    // Add a product to the cart by item ID
    async addProductToCart(itemId: string): Promise<void> {
        const addToCartButton = `${this.addToCartButtonPrefix}${itemId}"]`;
        await this.page.click(addToCartButton);
    }

    // Get the number of items in the inventory
    async getInventoryItemCount(): Promise<number> {
        return await this.page.locator(this.inventoryItem).count();
    }

    // Navigate to the shopping cart page
    async goToCart(): Promise<CartPage> {
        await this.page.click(this.shoppingCartLink);
        return new CartPage(this.page);
    }
}
