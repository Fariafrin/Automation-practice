import { test } from "@playwright/test";
import { login } from "../utilities/loginHelper";
import { createemployee } from "../utilities/createemployeeHelper";
import { searchEmployee } from "../utilities/searchEmployeeHelper";

test.describe("OrangeHRM Tests", () => {
    //This runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        await login(page); // Login step
        await createemployee(page); // Employee creation
    });

    test("OrangeHRM Search Employee Test", async ({ page }) => {
        await searchEmployee(page);
    });
});
