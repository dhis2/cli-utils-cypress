import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user visits the app', () => {
    cy.visit('http://localhost:3000')
})

Then('the app shows a list of user groups from the database', () => {
    cy.get('ul > li').contains('Administrators').should('exist')
})