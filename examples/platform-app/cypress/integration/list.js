describe('Listing', () => {
    it('disaplays a list of usergroups from the network (fixtures)', () => {
        cy.visit('http://localhost:3000')
        cy.get('ul').children().should('have.length', 31)
    })

    it('disaplays a list of usergroups from a local fixture', () => {
        const body = {
            pager: { page: 1, pageCount: 1, total: 2, pageSize: 50 },
            userGroups: [
                { id: 'wl5cDMuUhmF', displayName: 'Administrators' },
                { id: 'vAvEltyXGbD', displayName: 'Africare HQ' },
            ],
        }
        cy.intercept(/\/userGroups/, { body })
        cy.visit('http://localhost:3000')
        cy.get('ul').children().should('have.length', 2)
    })
})
