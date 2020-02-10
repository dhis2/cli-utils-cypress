const loginEndPoint = 'dhis-web-commons/security/login.action'

/**
 * This is done through cy.request(...)
 * because Cypress doesn't allow multiple domains per test:
 * https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test
 */
module.exports = () => {
    Cypress.Commands.add('login', () => {
        const username = Cypress.env('dhis2_username')
        const password = Cypress.env('dhis2_password')
        const loginUrl = Cypress.env('dhis2_base_url')
        const loginAuth = `Basic ${btoa(`${username}:${password}`)}`

        return cy.request({
            url: `${loginUrl}/${loginEndPoint}`,
            method: 'POST',
            body: {
                j_username: username,
                j_password: password,
                '2fa_code': '',
            },
            headers: { Authorization: loginAuth },
        })
    })

    Cypress.Commands.add(
        'stubWithFixture',
        ({ method = 'GET', url, fixture }) => {
            return cy.route({
                method,
                url,
                response: `fixture:${fixture}`,
            })
        }
    )

    Cypress.Commands.add('visitWhenStubbed', (url, options = {}) => {
        return cy.visit(url, {
            ...options,
            onBeforeLoad: win => {
                delete win.fetch
                options.onBeforeLoad && options.onBeforeLoad(win)
            },
        })
    })
}
