const inquirer = require('@dhis2/cli-helpers-engine').inquirer

module.exports.enableNetworkShim = async ({ options, state }) => {
    if (!options.enableNetworkShim) return state

    const prompt = inquirer.createPromptModule()

    const { serverMinorVersion } = await prompt([
        {
            type: 'input',
            name: 'serverMinorVersion',
            message: 'The minor version of the server (e. g. 37)',
            default: '',
        },
    ])

    const nextState = {
        ...state,
        cypressJson: {
            ...state.cypressJson,
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

    if (serverMinorVersion) {
        nextState.cypressJson.env.serverMinorVersion = serverMinorVersion
    }

    return nextState
}
