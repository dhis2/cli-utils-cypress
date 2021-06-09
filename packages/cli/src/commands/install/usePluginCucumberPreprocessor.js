module.exports.usePluginCucumberPreprocessor = ({ options, state }) => {
    if (!options.usePluginCucumberPreprocessor) return state

    return {
        ...state,
        plugins: [
            ...state.plugins,
            {
                name: 'cucumberPreprocessor',
                needsConfig: true,
            },
        ],
    }
}
