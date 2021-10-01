const inquirer = require('@dhis2/cli-helpers-engine').inquirer

module.exports.enableNetworkShim = async ({ options, state }) => {
    if (!options.enableNetworkShim) return state

    const prompt = inquirer.createPromptModule()

    const { dhis2ApiVersion } = await prompt([
        {
            type: 'input',
            name: 'dhis2ApiVersion',
            message: 'The minor version of the server (e. g. 37)',
            default: '',
        },
    ])

    const nextState = {
        ...state,
        cypressJson: {
            ...state.cypressJson,
            experimentalInteractiveRunEvents: true,
            env: {
                ...state.cypressJson.env,
                networkMode: 'live',
            },
        },
        support: [...state.support, 'enableNetworkShim'],
        plugins: [
            ...state.plugins,
            {
                name: 'networkShim',
                needsConfig: false,
            },
        ],
    }

    if (dhis2ApiVersion) {
        nextState.cypressJson.env.dhis2ApiVersion = dhis2ApiVersion
    }

    return nextState
}
