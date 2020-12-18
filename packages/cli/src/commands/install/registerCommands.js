module.exports.registerCommands = ({ options, state }) => {
    if (!options.registerCommands) return state

    return {
        ...state,
        support: [
            ...state.support,

            // will ensure that the length is not 0,
            // so the import-statement for @dhis2/cypress-commands
            // will be added
            null,
        ],
    }
}
