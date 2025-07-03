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
    await expect.soft(page).toHaveURL(/.*dashboard/);

    // Optionally, check for a Dashboard element
    const dashboardHeader = page.locator("h6:has-text('Dashboard')");
    await expect.soft(dashboardHeader).toBeVisible();

    //await page.getByRole("link", { name: "PIM" }).click();

    //await expect(page).toHaveURL(/.*"PIM"/);
    //await page.pause();
    await page.getByRole("link", { name: "PIM" }).click();
    await expect.soft(page).toHaveURL(/.*pim.*/i);

    const pimHeader = page.locator("h5:has-text('Employee Information')");
    await expect.soft(pimHeader).toBeVisible();
    // await page.pause();
    // await page.getByPlaceholder("Type for hints..").fill("Lisa");
    await page.getByRole("button", { name: " Add" }).click();
    await expect.soft(page).toHaveURL(/.*pim.*/i);
    const addempHeader = page.locator("h6:has-text('Add Employee')");
    await expect.soft(addempHeader).toBeVisible();

    await page.getByPlaceholder("First Name").fill("Lisa");
    await page.getByPlaceholder("Middle Name").fill("AF");
    await page.getByPlaceholder("Last Name").fill("RiN");

    const toggleSelector = "input[type='checkbox']";
    await page.click(toggleSelector);
    await page.pause();
    // console.log("*************************************************");
});
