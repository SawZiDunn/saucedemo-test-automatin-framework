import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { InventoryPage } from "./InventoryPage";

export class LoginPage extends BasePage {
    // element selectors
    private usernameInput = '[data-test="username"]';
    private passwordInput = '[data-test="password"]';
    private loginButton = '[data-test="login-button"]';
    private errorMessage = '[data-test="error"]';

    constructor(page: Page) {
        super(page);
    }

    // navigate to login page
    async navigate(): Promise<LoginPage> {
        await this.navigateTo("/");
        return this;
    }

    // Enter username
    async enterUsername(username: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
    }

    // Enter password
    async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.passwordInput, password);
    }

    // Click login button
    async clickLogin(): Promise<void> {
        await this.page.click(this.loginButton);
    }

    // Perform login with provided credentials
    async login(username: string, password: string): Promise<InventoryPage> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
        return new InventoryPage(this.page);
    }

    // Check if error message is visible
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.isElementVisible(this.errorMessage);
    }

    // get err msg
    async getErrorMessage(): Promise<string | null> {
        return await this.getTextContent(this.errorMessage);
    }
}
