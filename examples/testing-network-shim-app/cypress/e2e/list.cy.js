describe('List', () => {
    it('is possible to add and remove from the list', () => {
        cy.visit('http://localhost:3000')
        cy.get('.list').children().should('have.length', 3)

        // Should add a new array response body array item
        cy.get('.add-update-input').type('Harry')
        cy.get('.add-update-button-confirm').click()

        cy.get('.list').children().should('have.length', 4)

        // Should add a new array response body array item
        cy.get('.add-update-input').type('Barry')
        cy.get('.add-update-button-confirm').click()

        cy.get('.list').children().should('have.length', 5)

        // Should produce an extra responseLookup array item
        // but not a new responseBody array item
        cy.contains('li', 'Barry').find('button').last().click()
        cy.get('.list').children().should('have.length', 4)

        // Should produce an extra responseLookup array item
        // but not a new responseBody array item
        cy.contains('li', 'Harry').find('button').last().click()
        cy.get('.list').children().should('have.length', 3)
    })
})
