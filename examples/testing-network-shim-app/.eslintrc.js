const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: ['plugin:cypress/recommended', config.eslintReact],
}
