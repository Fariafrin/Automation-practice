/* eslint-disable playwright/no-useless-await */
/* eslint-disable playwright/require-top-level-describe */
/* eslint-disable playwright/no-page-pause */
import { test, expect } from "@playwright/test";
import { login } from "../utilities/login";
import * as fs from "fs";
import { faker } from "@faker-js/faker";
import { clickElement } from "../utilities/wrappers/click";
import { fillInput } from "../utilities/wrappers/fill";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test("OrangeHRM Add Employee Test", async ({ page }) => {
        //await login(page);

        const pim = await page.getByRole("link", { name: "PIM" });
        await clickElement(pim);
        await expect.soft(page).toHaveURL(/.*pim.*/i);

        const pimHeader = page.locator("h5:has-text('Employee Information')");
        await expect.soft(pimHeader).toBeVisible();

        const addbutton = page.getByRole("button", { name: " Add" });
        await clickElement(addbutton);
        await expect.soft(page).toHaveURL(/.*pim.*/i);

        const addempHeader = page.locator("h6:has-text('Add Employee')");
        await expect.soft(addempHeader).toBeVisible();

        const firstName = faker.person.firstName();
        const middleName = faker.person.middleName();
        const lastName = faker.person.lastName();
        await page.getByPlaceholder("First Name").fill(firstName);
        await page.getByPlaceholder("Middle Name").fill(middleName);
        await page.getByPlaceholder("Last Name").fill(lastName);

        function generateUTCId(): string {
            const now = new Date();
            const fullTimeStr = now.toISOString().replace(/[-:.TZ]/g, "");
            return fullTimeStr.substring(0, 10);
        }

        // Fill employee ID field
        const uniqueEmpID = generateUTCId();

        await page.getByRole("textbox").nth(4).fill(uniqueEmpID);

        // Save employee ID to JSON file
        const empData = { employeeId: uniqueEmpID };
        fs.writeFileSync(
            "data/employeeData.json",
            JSON.stringify(empData, null, 2),
        );

        const savebutton = page.getByRole("button", { name: "Save" });
        await clickElement(savebutton);

        await expect.soft(page).toHaveURL(/.*PersonalDetails.*/i);

        const pdHeader = page.locator("h6:has-text('Personal Details')");
        await expect.soft(pdHeader).toBeVisible();

        // await page.pause();
    });
});
