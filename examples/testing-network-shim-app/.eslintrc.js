const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact],
    overrides: [
        {
            files: ['cypress/**/*.js', 'cypress/**/*.ts'],
            extends: ['plugin:cypress/recommended'],
        },
    ],
}
