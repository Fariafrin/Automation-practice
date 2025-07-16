import { test } from "@playwright/test";
import { login } from "../utilities/loginHelper";
import { createemployee } from "../utilities/createemployeeHelper";
import { searchEmployee } from "../utilities/searchEmployeeHelper";
import { editEmployee } from "../utilities/editEmployeeHelper";

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
