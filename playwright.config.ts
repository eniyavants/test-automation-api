import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  use: {
    //ignoreHTTPSErrors: true,
  },
};

export default config;
