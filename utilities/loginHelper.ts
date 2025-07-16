// import { Page, expect } from "@playwright/test";
// import { clickElement } from "../utilities/wrappers/click";
// import { fillInput } from "../utilities/wrappers/fill";
// import { gotoURL } from "../utilities/wrappers/goto";

// export async function login(page: Page) {
//     const usernameInput = page.getByPlaceholder("Username");
//     const passwordInput = page.getByPlaceholder("Password");
//     const loginButton = page.getByRole("button", { name: "Login" });

//     await gotoURL(
//         page,
//         "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
//     );
//     await fillInput(usernameInput, "Admin");
//     await fillInput(passwordInput, "admin123");
//     await clickElement(loginButton);

//     // Optional assertions to ensure login worked
//     await expect.soft(page).toHaveURL(/.*dashboard/);
//     const dashboardHeader = page.locator("h6:has-text('Dashboard')");
//     await expect.soft(dashboardHeader).toBeVisible();
// }

import { Page, expect } from "@playwright/test";
import { clickElement } from "./wrappers/click";
import { fillInput } from "./wrappers/fill";
import { gotoURL } from "./wrappers/goto";
import { LoginPage } from "../page_objects/loginPage";

export async function login(page: Page) {
    const loginPage = new LoginPage(page);

    await gotoURL(
        page,
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await fillInput(loginPage.getUsernameInput(), "Admin");
    await fillInput(loginPage.getPasswordInput(), "admin123");
    await clickElement(loginPage.getLoginButton());

    await expect.soft(page).toHaveURL(/.*dashboard/);
    const dashboardHeader = page.locator("h6:has-text('Dashboard')");
    await expect.soft(dashboardHeader).toBeVisible();
}
