const LOGIN_END_POINT = 'dhis-web-commons-security/login.action'

const loginBasicAuth = () => {
    const username = Cypress.env('dhis2_username')
    const password = Cypress.env('dhis2_password')
    const loginUrl = Cypress.env('dhis2_base_url')

    return cy.request({
        url: `${loginUrl}/${LOGIN_END_POINT}`,
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

const loginDev = () => {
    cy.visit('/')
    cy.get('body')
        .then($body => {
            if (!$body.find('input#server')) return cy.wrap(false)

            const loginUrl = Cypress.env('dhis2_base_url')
            const username = Cypress.env('dhis2_username')
            const password = Cypress.env('dhis2_password')

            cy.get('#server').type(loginUrl)
            cy.get('#j_username').type(username)
            cy.get('#j_password').type(password)
            cy.get('{button}', { prefix: 'dhis2-uicore' }).click()

            return cy.wrap(true)
        })
        .then(found => {
            if (found) return cy.wrap(true)
            loginBasicAuth()
                .its('body')
                .should('not.include', 'class="loginPage"')
            return cy.wrap(true)
        })
        .then(() => {
            return cy
        })
}

/**
 * This is done through cy.request(...)
 * because Cypress doesn't allow multiple domains per test:
 * https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test
 */
export const login = () => {
    return loginDev()
}
