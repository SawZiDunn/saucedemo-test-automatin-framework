import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../utils/config";

test.describe("Login Tests", () => {
    let loginPage: LoginPage;

    // navigate to loginPage before each test
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test("Successful login with valid credentials", async () => {
        // returns inventory page
        const inventoryPage = await loginPage.login(
            config.validUsername,
            config.validPassword
        );

        // assert multiple checks
        expect(await inventoryPage.isLoaded()).toBeTruthy();
        expect(await inventoryPage.isTitleVisible()).toBeTruthy();
        expect(await inventoryPage.isShoppingCartVisible()).toBeTruthy();

        // URL check
        const currentUrl = await inventoryPage.getCurrentUrl();
        expect(currentUrl).toContain("inventory");
    });

    test("Error message with invalid credentials", async () => {
        await loginPage.login("locked_out_user", "secret_sauce");

        // check err msg exists
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();

        expect(await loginPage.getErrorMessage()).toMatch(/locked out/i);
    });

    test("Error message with wrong password", async () => {
        await loginPage.login(config.validUsername, "wrong_password");

        // check err msg exists
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
        expect(await loginPage.getErrorMessage()).toMatch(/do not match/i);
    });
});
