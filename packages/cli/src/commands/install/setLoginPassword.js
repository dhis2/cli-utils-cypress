const inquirer = require('inquirer')

module.exports.setLoginPassword = async ({ options, state }) => {
    if (!options.setLoginPassword) return state

    const prompt = inquirer.createPromptModule()

    const envAnswers = await prompt([
        {
            type: 'input',
            name: 'password',
            message: 'DHIS2 Username password:',
            default: 'district',
        },
    ])

    return {
        ...state,
        cypressEnvJson: {
            ...state.cypressEnvJson,
            dhis2_password: envAnswers.password,
        },
    }
}