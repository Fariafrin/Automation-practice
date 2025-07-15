import { defineConfig, devices } from "@playwright/test";

// Optional flag to toggle file-based reports like Monocart
const saveReport = true;

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    // ⬇️ Conditional reporters based on saveReport
    reporter: saveReport
        ? [
              ["list"], // Console view
              [
                  "monocart-reporter",
                  {
                      name: "AEL Report",
                      outputFile:
                          "artifacts/test_reports/monocart-report/index.html",
                  },
              ],
              // You can uncomment other reporters here if needed
              // ["html", { outputFolder: "artifacts/test_reports/html-report", open: "never" }],
              // ["json", { outputFile: "artifacts/test_reports/json-report/report.json" }],
              // ["allure-playwright", {
              //     resultsDir: "artifacts/test_reports/allure-results",
              //     environmentInfo: {
              //         os_platform: os.platform(),
              //         os_release: os.release(),
              //         os_version: os.version(),
              //         node_version: process.version,
              //     },
              // }],
          ]
        : [["list"]],

    expect: {
        // Maximum time expect() should wait for the condition to be met
        timeout: 90 * 1000, // isPipeline ? 2 * 60 * 1000 : 90 * 1000, // 20 seconds
    },

    use: {
        trace: "on-first-retry",
        actionTimeout: 60 * 1000 * 5,
        navigationTimeout: 60 * 1000 * 5,
    },

    // Global timeout for each test
    timeout: 10 * 60000,

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"], headless: false },
        },
        // Uncomment to test on other browsers
        // {
        //     name: "firefox",
        //     use: { ...devices["Desktop Firefox"] },
        // },
        // {
        //     name: "webkit",
        //     use: { ...devices["Desktop Safari"] },
        // },
    ],

    // Optional dev server
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
