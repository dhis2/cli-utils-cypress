module.exports.usePluginChromeAllowXSiteCookies = ({ options, state }) => {
    if (!options.usePluginChromeAllowXSiteCookies) return state

    return {
        ...state,
        plugins: [...state.plugins, 'chromeAllowXSiteCookies'],
    }
}
