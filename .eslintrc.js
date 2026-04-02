const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslint],
    overrides: [
        {
            files: [
                'packages/cypress-*/**/*.js',
                'packages/cypress-*/**/*.ts',
                'cypress/**/*.js',
                'cypress/**/*.ts',
            ],
            extends: ['plugin:cypress/recommended'],
        },
    ],
}
