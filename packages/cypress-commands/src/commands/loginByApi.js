Cypress.Commands.add('loginByApi', ({ username, password, baseUrl }) => {
    // Login via API
    cy.request({
        url: `${baseUrl}/dhis-web-commons-security/login.action`,
        method: 'POST',
        form: true,
        followRedirect: true,
        body: {
            j_username: username,
            j_password: password,
            '2fa_code': '',
        },
    })

    // Set base url for the app platform
    window.localStorage.setItem('DHIS2_BASE_URL', baseUrl)
})
