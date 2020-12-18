module.exports.setRecordVideo = ({ options, state }) => {
    if (!options.setRecordVideo) return state

    return {
        ...state,
        cypressJson: {
            ...state.cypressJson,
            video: true,
        },
    }
}
