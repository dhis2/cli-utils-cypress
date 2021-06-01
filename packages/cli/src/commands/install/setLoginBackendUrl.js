const inquirer = require('inquirer')

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
            DHIS2_BASE_URL: envAnswers.dhis2Url,
        },
    }
}
