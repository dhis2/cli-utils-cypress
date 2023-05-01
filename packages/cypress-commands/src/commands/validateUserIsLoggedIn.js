Cypress.Commands.add('validateUserIsLoggedIn', ({ baseUrl, username }) => {
    cy.request(`${baseUrl}/api/me`).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.username).to.eq(username)
    })
})
