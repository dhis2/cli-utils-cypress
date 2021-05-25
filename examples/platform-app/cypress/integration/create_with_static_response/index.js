import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const staticResponse = {
    httpStatus: 'Created',
    httpStatusCode: 201,
    status: 'OK',
    response: {
        responseType: 'ObjectReport',
        uid: 'I am a teapot',
        klass: 'org.hisp.dhis.user.UserGroup',
        errorReports: [],
    },
}

Before(() => {
    cy.intercept('POST', /userGroups/, staticResponse).as('userGroupPost')
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

Then(
    'the response to the POST request should equal the static response',
    () => {
        cy.wait('@userGroupPost')
            .its('response.body')
            .should('eql', staticResponse)
    }
)
