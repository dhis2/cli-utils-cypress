const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslint],
    globals: {
        Cypress: 'readonly',
        cy: 'readonly',
    },
}
