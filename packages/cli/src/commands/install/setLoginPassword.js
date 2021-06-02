const inquirer = require('@dhis2/cli-helpers-engine').inquirer

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
            dhis2Password: envAnswers.password,
        },
    }
}
