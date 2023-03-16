function fillInLoginForm({ name, password, server }) {
    // Ensure we're on the login page
    cy.get('h1:contains("Please sign in")').should('exist')

    // Enter credentials
    cy.get('input#server').type(server)
    cy.get('input#j_username').type(name)
    cy.get('input#j_password').type(password)
    cy.get('[data-test="dhis2-adapter-loginsubmit"]').click()
}

Cypress.Commands.add('fillInLoginForm', fillInLoginForm)
