const inquirer = require('@dhis2/cli-helpers-engine').inquirer

module.exports.setProjectId = async ({ options, state }) => {
    if (!options.setProjectId) return state

    const prompt = inquirer.createPromptModule()

    const cypressAnswers = await prompt([
        {
            type: 'input',
            name: 'projectId',
            message: 'The unique Cypress project ID:',
            default: '',
        },
    ])

    return {
        ...state,
        cypressJson: {
            ...state.cypressJson,
            projectId: cypressAnswers.projectId,
        },
    }
}
