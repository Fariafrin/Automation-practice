/* eslint-disable playwright/require-soft-assertions */
/* eslint-disable playwright/require-top-level-describe */
import { test, expect } from "@playwright/test";
test("OrangeHRM Login Test", async ({ page }) => {
    // Navigate to the Login Page
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    // Locate and Fill Username
    await page.getByPlaceholder("Username").fill("Admin");

    // Locate and Fill Password
    await page.getByPlaceholder("Password").fill("admin123");

    // Click the Login Button
    await page.getByRole("button", { name: "Login" }).click();

    // Assertion to ensure Login was successful
    await expect(page).toHaveURL(/.*dashboard/);

    // Optionally, check for a Dashboard element
    const dashboardHeader = page.locator("h6:has-text('Dashboard')");
    await expect(dashboardHeader).toBeVisible();
});
