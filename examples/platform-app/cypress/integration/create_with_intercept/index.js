import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.intercept('POST', /userGroups/).as('userGroupPost')
})

Given('the user visits the app', () => {
    cy.visit('http://localhost:3000')
})

When('the user types in the input', () => {
    cy.get('input').type('AAAAAAA_CREATED_IN_TEST')
})

Then('the user clicks the add button', () => {
    cy.get('button').contains('Add').click()
})

Then('the response to the POST request has status OK', () => {
    cy.wait('@userGroupPost').its('response.body.status').should('equal', 'OK')
})
