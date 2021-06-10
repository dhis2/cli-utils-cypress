const chromeAllowXSiteCookies = require('./plugins/chromeAllowXSiteCookies')
const cucumberPreprocessor = require('./plugins/cucumberPreprocessor')
const networkShim = require('./plugins/networkShim/index.js')

module.exports = {
    cucumberPreprocessor,
    chromeAllowXSiteCookies,
    networkShim,
}
