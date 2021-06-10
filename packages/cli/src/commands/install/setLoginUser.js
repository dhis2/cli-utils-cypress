const inquirer = require('@dhis2/cli-helpers-engine').inquirer

module.exports.setLoginUser = async ({ options, state }) => {
    if (!options.setLoginUser) return state

    const prompt = inquirer.createPromptModule()

    const envAnswers = await prompt([
        {
            type: 'input',
            name: 'username',
            message: 'DHIS2 Username:',
            default: 'admin',
        },
    ])

    return {
        ...state,
        cypressEnvJson: {
            ...state.cypressEnvJson,
            dhis2Username: envAnswers.username,
        },
    }
}
