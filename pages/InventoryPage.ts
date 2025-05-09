import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartPage } from "./CartPage";

export class InventoryPage extends BasePage {
    // select with data-test attribute instead of class name or element name
    private title = '[data-test="title"]';
    private inventoryContainer = '[data-test="inventory-container"]';
    private shoppingCartLink = '[data-test="shopping-cart-link"]';
    private shoppingCartBadge = '[data-test="shopping-cart-badge"]';
    private addToCartButtonPrefix = '[data-test="add-to-cart-';

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

    // get item count from shoppingCartBadge
    async getShoppingCartBadgeCount(): Promise<number> {
        let count: string | null = await this.getTextContent(
            this.shoppingCartBadge
        );

        return count ? parseInt(count) : 0;
    }

    // Navigate to the shopping cart page
    async goToCart(): Promise<CartPage> {
        await this.page.click(this.shoppingCartLink);
        return new CartPage(this.page);
    }
}
