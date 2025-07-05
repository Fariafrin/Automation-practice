import { Page, expect } from "@playwright/test";

export async function login(page: Page) {
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    // Optional assertions to ensure login worked
    await expect.soft(page).toHaveURL(/.*dashboard/);
    const dashboardHeader = page.locator("h6:has-text('Dashboard')");
    await expect.soft(dashboardHeader).toBeVisible();
}
