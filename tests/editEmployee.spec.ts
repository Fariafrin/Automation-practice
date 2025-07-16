import { test } from "@playwright/test";
import { login } from "../utilities/Login";
import { createemployee } from "../utilities/createemployee";
import { searchEmployee } from "../utilities/searchEmployee";
import { editEmployee } from "../utilities/editEmployee";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page);
        await createemployee(page);
        await searchEmployee(page);
    });

    test("OrangeHRM Edit Employee Test", async ({ page }) => {
        await editEmployee(page);
    });
});
