module.exports.setNonGlobalStepDefinitions = ({ options, state }) => {
    if (!options.setNonGlobalStepDefinitions) return state

    return {
        ...state,
        cypressCucumberPreprocessorJson: {
            ...state.cypressCucumberPreprocessorJson,
            nonGlobalStepDefinitions: true,
        },
    }
}
