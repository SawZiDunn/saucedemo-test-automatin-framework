import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

test.describe("End-to-End Purchase Test", () => {
    test("Complete purchase flow from login to order confirmation", async ({
        page,
    }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        const inventoryPage = await loginPage.login(
            "standard_user",
            "secret_sauce"
        );

        // Login with valid credentials
        expect(inventoryPage.isLoaded()).toBeTruthy();

        // Add items to cart

        await inventoryPage.addProductToCart("sauce-labs-backpack");
        await inventoryPage.addProductToCart("sauce-labs-bike-light");

        const cartPage = await inventoryPage.goToCart();
        // check if cartPage is loaded
        expect(await cartPage.isLoaded()).toBeTruthy();

        // check if there're two items in the cart
        expect(await cartPage.getCartItemCount()).toBe(2);
    });
});
