module.exports.enableAutoLogin = ({ options, state }) => {
    if (!options.enableAutoLogin) return state

    return {
        ...state,
        support: [...state.support, 'enableAutoLogin'],
    }
}
