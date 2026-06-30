import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración estándar de Playwright.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["list"]],
  outputDir: "test-results",

  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 7"] },
    },

    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"] },
    },
  ],

  webServer: {
    command: "pnpm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
