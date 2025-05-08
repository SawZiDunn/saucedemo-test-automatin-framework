import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
    private title = '[data-test="title"]';
    private inventoryContainer = '[data-test="inventory-container"]';
    private shoppingCartLink = '[data-test="shopping-cart-link"]';

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
}
