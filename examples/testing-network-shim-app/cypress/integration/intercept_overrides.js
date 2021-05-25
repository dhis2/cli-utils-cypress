describe('Intercept behaviour', () => {
    it('it will return a fixture from the network shim if no intercept is declared in the test', () => {        
        cy.visit('http://localhost:3000')                
        cy.get('.list').children().should('have.length', 3)
        cy.contains('Goofy').should('exist')
        cy.contains('Donald').should('exist')
        cy.contains('Duck').should('exist')
    })
    it('it will return a local fixture if cy.intercept setup to return one', () => {
        const localFixture = [
            {
                id: 'LOCAL_ID_1',
                name: 'Local name 1'
            },
            {
                id: 'LOCAL_ID_2',
                name: 'Local name 2'
            },
        ]
        
        cy.intercept('http://localhost:1337/api/36/names', {
            body: localFixture,
            status: 500,
        })
        cy.visit('http://localhost:3000')                
        cy.get('.list').children().should('have.length', 2)
        cy.contains('Local name 1').should('exist')
        cy.contains('Local name 2').should('exist')
    })
})