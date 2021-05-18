const {
    networkShim,
    chromeAllowXSiteCookies,
} = require('@dhis2/cypress-plugins')

module.exports = (on, config) => {
    networkShim(on, config)
    chromeAllowXSiteCookies(on, config)
}
