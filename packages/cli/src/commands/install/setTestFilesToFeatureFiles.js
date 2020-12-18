module.exports.setTestFilesToFeatureFiles = ({ options, state }) => {
    if (!options.setTestFilesToFeatureFiles) return state

    return {
        ...state,
        cypressJson: {
            ...state.cypressJson,
            testFiles: '**/*.feature',
        },
    }
}
