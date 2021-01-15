const cucumberPreprocessor = require('./plugins/cucumberPreprocessor')
const chromeAllowXSiteCookies = require('./plugins/chromeAllowXSiteCookies')
const networkShim = require('./plugins/networkShim/index.js')

module.exports = {
    cucumberPreprocessor,
    chromeAllowXSiteCookies,
    networkShim,
}
