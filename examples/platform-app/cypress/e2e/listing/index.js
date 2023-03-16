import '../common/index.js'
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

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

Then('the app shows a list of user groups based on the static response', () => {
    cy.get('ul').children().should('have.length', 2)
})
