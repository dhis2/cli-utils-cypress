const inquirer = require('@dhis2/cli-helpers-engine').inquirer

module.exports.setBaseUrl = async ({ options, state }) => {
    if (!options.setBaseUrl) return state

    const prompt = inquirer.createPromptModule()

    const cypressAnswers = await prompt([
        {
            type: 'input',
            name: 'baseUrl',
            message: 'URL that Cypress should run tests against:',
            default: 'http://localhost:3000',
        },
    ])

    return {
        ...state,
        cypressJson: {
            ...state.cypressJson,
            baseUrl: cypressAnswers.baseUrl,
        },
    }
}
