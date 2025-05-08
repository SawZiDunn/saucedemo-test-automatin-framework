import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../utils/config";

test.describe("End-to-End Purchase Test", () => {
    test("Complete purchase flow from login to order confirmation", async ({
        page,
    }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        const inventoryPage = await loginPage.login(
            config.validUsername,
            config.validPassword
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

        const checkoutInfoPage = await cartPage.checkout();

        // check if checkoutInfoPage loaded
        expect(await checkoutInfoPage.isLoaded()).toBeTruthy();

        const checkoutOverviewPage =
            await checkoutInfoPage.completeCheckoutInfo("John", "Doe", "12345");
        // check if checkout overview page is loaded
        expect(await checkoutOverviewPage.isLoaded()).toBeTruthy();

        // Get order summary information
        const subtotal = await checkoutOverviewPage.getSubtotal();
        const tax = await checkoutOverviewPage.getTax();
        const total = await checkoutOverviewPage.getTotal();

        // check order summary has values
        expect(subtotal).toBeTruthy();
        expect(tax).toBeTruthy();
        expect(total).toBeTruthy();

        // Complete the purchase
        const checkoutCompletePage =
            await checkoutOverviewPage.finishCheckout();

        // check checkoutCompletePage is loaded
        expect(await checkoutCompletePage.isLoaded()).toBeTruthy();

        // Verify success message
        const confirmationHeader =
            await checkoutCompletePage.getConfirmationHeader();
        expect(confirmationHeader).toMatch(/thank you/i);

        const confirmationText =
            await checkoutCompletePage.getConfirmationText();
        expect(confirmationText).toBeTruthy();
    });
});
