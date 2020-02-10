const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslint],
    globals: {
        cy: "readonly",
        Cypress: "readonly",
    }
}
