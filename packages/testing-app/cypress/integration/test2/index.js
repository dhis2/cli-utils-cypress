import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user opens the app', () => {
    cy.visit('/')
})

Then('the login form should be visible', () => {
    cy.get('[data-test="dhis2-uicore-modaltitle"]').should(
        'contain',
        'Please sign in'
    )
})

Then('the login form should display a server input', () => {
    cy.get('[data-test="dhis2-adapter-loginserver"]').should('exist')
})
