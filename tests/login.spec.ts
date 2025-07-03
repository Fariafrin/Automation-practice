import { test, expect } from "@playwright/test";

test("Navigate to OrangeHRM Login Page", async ({ page }) => {
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    await expect(page).toHaveURL(/.*auth\/login/);
    const loginButton = page.locator("button[type='submit']");
    await expect(loginButton).toBeVisible();
});
