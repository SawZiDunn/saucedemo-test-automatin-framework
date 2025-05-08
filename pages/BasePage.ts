import { Page } from "@playwright/test";

// define parent class for all pages to derive from
export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // navigate to any url
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    // return current url
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    // Get page title
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    // accepts selector string
    // return if element is visible or not
    async isElementVisible(selector: string): Promise<boolean> {
        const element = this.page.locator(selector);
        return await element.isVisible();
    }

    // accepts selector string
    // returns text content of the element
    async getTextContent(selector: string): Promise<string | null> {
        return await this.page.locator(selector).textContent();
    }
}
