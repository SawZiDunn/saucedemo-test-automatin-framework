import { test, expect } from "@playwright/test";

test("check heading", async ({ page }) => {
    await page.goto("https://valentine-psi-beige.vercel.app/");

    await expect(
        page.getByRole("heading", { name: /Will you be my Valentine/i })
    ).toBeVisible();
});
