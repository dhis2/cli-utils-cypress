const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../purge-plugin-legacy-code.js')
const transformOptions = {}

defineInlineTest(
    transform,
    transformOptions,
    "const plugins = require('@dhis2/cli-utils-cypress/plugins')",
    '',
    'Removes the legacy import'
)

defineInlineTest(
    transform,
    transformOptions,
    'plugins(on, config)',
    '',
    'Removes the legacy function call'
)

defineInlineTest(
    transform,
    transformOptions,
    // input
    `
    const {
        chromeAllowXSiteCookies,
        cucumberPreprocessor
    } = require('@dhis2/cypress-plugins');

    const plugins = require('@dhis2/cli-utils-cypress/plugins')

    module.exports = (on, config) => {
        chromeAllowXSiteCookies(on, config);
        cucumberPreprocessor(on, config);

        plugins(on, config)
    }
    `,
    // output
    `
    const {
        chromeAllowXSiteCookies,
        cucumberPreprocessor
    } = require('@dhis2/cypress-plugins');

    module.exports = (on, config) => {
        chromeAllowXSiteCookies(on, config);
        cucumberPreprocessor(on, config);
    }
    `,
    'Correctly transforms a typical file'
)
