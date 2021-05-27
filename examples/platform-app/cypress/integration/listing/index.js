import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a static response object is declared', () => {
    const body = {
        pager: { page: 1, pageCount: 1, total: 2, pageSize: 50 },
        userGroups: [
            { id: 'wl5cDMuUhmF', displayName: 'Administrators' },
            { id: 'vAvEltyXGbD', displayName: 'Africare HQ' },
        ],
    }
    cy.intercept(/\/userGroups/, { body })
})

Given('the user visits the app', () => {
    cy.visit('http://localhost:3000')
})

Then('the app shows a list of user groups from the database', () => {
    cy.get('ul > li').contains('Administrators').should('exist')
})

Then('the app shows a list of user groups based on the static response', () => {
    cy.get('ul').children().should('have.length', 2)
})
