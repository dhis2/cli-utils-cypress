const chromeAllowXSiteCookies = require('./plugins/chromeAllowXSiteCookies.js')
const cucumberPreprocessor = require('./plugins/cucumberPreprocessor.js')
const networkShim = require('./plugins/networkShim/index.js')

module.exports = {
    cucumberPreprocessor,
    chromeAllowXSiteCookies,
    networkShim,
}
