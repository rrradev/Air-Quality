import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./tests/setup/visual-setup.ts'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['blob', { outputFile: 'all-blob-reports/report-visual.zip' }],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: [
        'specs/visual-regression/*.spec.ts',
      ],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: [
        'specs/visual-regression/*.spec.ts',
      ],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: [
        'specs/visual-regression/*.spec.ts',
      ],
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: [
        'specs/visual-regression/*.spec.ts',
      ],
    },

    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testMatch: [
        'specs/visual-regression/*.spec.ts',
      ],
    },

  ],

  webServer: {
    command: 'cd ../ && npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
