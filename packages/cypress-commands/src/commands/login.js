export const LOGIN_ENDPOINT = 'dhis-web-commons-security/login.action'

/**
 * This is done through cy.request(...)
 * because Cypress doesn't allow multiple domains per test:
 * https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test
 */
export const login = () => {
    const username = Cypress.env('dhis2Username')
    const password = Cypress.env('dhis2Password')
    const baseUrl = Cypress.env('dhis2BaseUrl')

    cy.session(
        'user',
        () => {
            cy.request({
                url: `${baseUrl}/${LOGIN_ENDPOINT}`,
                method: 'POST',
                form: true,
                followRedirect: true,
                body: {
                    j_username: username,
                    j_password: password,
                    '2fa_code': '',
                },
            }).then(() => {
                window.localStorage.setItem('DHIS2_BASE_URL', baseUrl)
            })
        },
        {
            cacheAcrossSpecs: true,
        }
    )
}

Cypress.Commands.add('login', login)
