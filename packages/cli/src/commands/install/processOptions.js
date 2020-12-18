const { options } = require('./options.js')

module.exports.processOptions = async ({
    initialState,
    providedOptions,
    paths,
}) => {
    let state = initialState

    for (const option of options) {
        state = await option.handler({ state, options: providedOptions, paths })
    }

    return state
}
