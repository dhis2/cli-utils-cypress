import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('an Alertbar with onHidden handler is rendered', () => {
    cy.visitStory('Alertbar', 'With onHidden')
})

Then('the onHidden handler is called', () => {
    cy.window().should(win => {
        expect(win.onHidden).to.be.calledOnce
        expect(win.onHidden).to.be.calledWith({}, null)
    })
})

Given('the app is rendered without a cy.intercept in the test', () => {
    cy.visit('http://localhost:3000')
})
Then(
    'the list of usergroups matches the network fixture produced by the shim',
    () => {
        cy.get('.list').children().should('have.length', 31)
    }
)
Given('the app is rendered with a cy.intercept in the test', () => {
    const body = {
        pager: { page: 1, pageCount: 1, total: 2, pageSize: 50 },
        userGroups: [
            { id: 'wl5cDMuUhmF', displayName: 'Administrators' },
            { id: 'vAvEltyXGbD', displayName: 'Africare HQ' },
        ],
    }
    cy.intercept(/\/userGroups/, { body })
    cy.visit('http://localhost:3000')
})
Then('the list of usergroups matches the fixture in the test', () => {
    cy.get('.list').children().should('have.length', 2)
})
