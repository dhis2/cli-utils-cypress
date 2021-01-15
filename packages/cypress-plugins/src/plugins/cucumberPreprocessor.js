const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = function cucumberPreprocessor(on) {
    on('file:preprocessor', cucumber())
}
