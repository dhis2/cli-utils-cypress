module.exports = function cucumberPreprocessor(on) {
    const cucumber = require('cypress-cucumber-preprocessor').default
    on('file:preprocessor', cucumber())
}
