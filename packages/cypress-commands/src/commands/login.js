export const LOGIN_ENDPOINT = 'dhis-web-commons-security/login.action'

/**
 * This is done through cy.request(...)
 * because Cypress doesn't allow multiple domains per test:
 * https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test
 */
export const login = () => {
    const username = Cypress.env('DHIS2_USERNAME')
    const password = Cypress.env('DHIS2_PASSWORD')
    const loginUrl = Cypress.env('DHIS2_BASE_URL')

    cy.request({
        url: `${loginUrl}/${LOGIN_ENDPOINT}`,
        method: 'POST',
        form: true,
        followRedirect: true,
        body: {
            j_username: username,
            j_password: password,
            '2fa_code': '',
        },
    })
}

Cypress.Commands.add('login', login)
