const inquirer = require('@dhis2/cli-helpers-engine').inquirer

module.exports.setLoginBackendUrl = async ({ options, state }) => {
    if (!options.setLoginBackendUrl) return state

    const prompt = inquirer.createPromptModule()

    const envAnswers = await prompt([
        {
            type: 'input',
            name: 'dhis2Url',
            message: 'The DHIS2 instance URL to use as backend:',
            default: 'http://localhost:8080',
        },
    ])

    return {
        ...state,
        cypressEnvJson: {
            ...state.cypressEnvJson,
            dhis2BaseUrl: envAnswers.dhis2Url,
        },
    }
}
