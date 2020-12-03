import cucumber from 'cypress-cucumber-preprocessor'

export const cucumberPreprocessor = on => {
    on('file:preprocessor', cucumber())
}
