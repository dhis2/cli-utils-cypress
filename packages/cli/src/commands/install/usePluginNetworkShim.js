module.exports.usePluginNetworkShim = ({ options, state }) => {
    if (!options.usePluginNetworkShim) return state

    return {
        ...state,
        plugins: [...state.plugins, {
            name: 'networkShim',
            needsConfig: false,
        }],
    }
}
