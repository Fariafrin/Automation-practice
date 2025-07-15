import { Page, expect } from "@playwright/test";
import { clickElement } from "../utilities/wrappers/click";
import { fillInput } from "../utilities/wrappers/fill";
import { gotoURL } from "../utilities/wrappers/goto";

export async function login(page: Page) {
    const usernameInput = page.getByPlaceholder("Username");
    const passwordInput = page.getByPlaceholder("Password");
    const loginButton = page.getByRole("button", { name: "Login" });

    await gotoURL(
        page,
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await fillInput(usernameInput, "Admin");
    await fillInput(passwordInput, "admin123");
    await clickElement(loginButton);

    // Optional assertions to ensure login worked
    await expect.soft(page).toHaveURL(/.*dashboard/);
    const dashboardHeader = page.locator("h6:has-text('Dashboard')");
    await expect.soft(dashboardHeader).toBeVisible();
}
