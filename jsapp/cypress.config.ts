import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const envName = config.env.envName || 'local';
      const envFile = `./cypress/config/cypress.env.${envName}.json`;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const settings = require(envFile);

      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl;
      }

      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        };
      }

      // console.log(11111, 'CONFIG', config);
      return config;
    },
    excludeSpecPattern: ['**/1-getting-started/**/*', '**/2-advanced-examples/**/*'],
    experimentalStudio: true,
  },
});
