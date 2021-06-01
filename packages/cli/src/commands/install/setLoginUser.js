const inquirer = require('inquirer')

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
            DHIS2_USERNAME: envAnswers.username,
        },
    }
}
