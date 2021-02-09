module.exports.useCommandsSetupEnableNetworkShim = ({ options, state }) => {
    if (!options.useCommandsSetupEnableNetworkShim) return state

    return {
        ...state,
        support: [...state.support, 'enableNetworkShim'],
    }
}
