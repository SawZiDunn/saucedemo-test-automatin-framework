import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

test.describe("Login Test", () => {
    test("Successful login with valid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        // returns inventory page
        const inventoryPage = await loginPage.login(
            "standard_user",
            "secret_sauce"
        );

        // assert multiple checks
        expect(await inventoryPage.isLoaded()).toBeTruthy();
        expect(await inventoryPage.isTitleVisible()).toBeTruthy();
        expect(await inventoryPage.isShoppingCartVisible()).toBeTruthy();

        // URL check
        const currentUrl = await inventoryPage.getCurrentUrl();
        expect(currentUrl).toContain("inventory");
    });

    test("Error message with invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        await loginPage.login("locked_out_user", "secret_sauce");

        // check err msg exists
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    });

    test("Error message with wrong password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        await loginPage.login("standard_user", "wrong_password");

        // check err msg exists
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    });
});
