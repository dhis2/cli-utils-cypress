const {
    networkShim,
    chromeAllowXSiteCookies,
    cucumberPreprocessor,
} = require('@dhis2/cypress-plugins')
const { defineConfig } = require('cypress')

/**
 * Configuration for the cypress-cucumber preprocessing, see:
 * https://github.com/badeball/cypress-cucumber-preprocessor/tree/master/examples/webpack-cjs
 */
async function setupNodeEvents(on, config) {
    // !! has to be the first call in `setupNodeEvents`
    await cucumberPreprocessor(on, config)

    networkShim(on, config)
    chromeAllowXSiteCookies(on, config)

    // Make sure to return the config object as it might have been modified by the plugin.
    return config
}

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents,
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.feature',
  },
})
