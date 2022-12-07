describe('Filter', () => {
    it('is possible to filter the list', () => {
        cy.visit('http://localhost:3000')
        cy.get('.list').children().should('have.length', 3)

        // After filtering we shouls see new fixtures being
        // produced because they can be differentiated on
        // query parameters
        cy.get('.filter-input').type('D')
        cy.get('.filter-button-filter').click()

        cy.get('.list').children().should('have.length', 2)

        cy.get('.filter-button-clear').click()

        cy.get('.list').children().should('have.length', 3)
    })
})
