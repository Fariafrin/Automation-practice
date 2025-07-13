/* eslint-disable playwright/no-page-pause */
import { Page, expect } from "@playwright/test";
import * as fs from "fs";

export async function editEmployee(page: Page) {
    await page.getByPlaceholder("First Name").fill("TESTEDIT");
    await page.pause();
    await page.getByRole("button", { name: "Save" }).nth(0).click();

    await page.pause();
}
