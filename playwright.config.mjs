import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  workers: 2,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:3100",
    channel: process.env.CI ? "chromium" : "msedge",
  },
  webServer: {
    command: "node scripts/serve.mjs",
    url: "http://127.0.0.1:3100",
    env: { PORT: "3100" },
    reuseExistingServer: !process.env.CI,
  },
});
