/* When the run starts the correct login endpoint is unknown, so an attempt
 * to login via the api endpoint is tried first and if that fails the
 * legacy endpoint is queried. Once a successful login has occurred,
 * the login instructions are stored as a Cypress environment variable
 * which will persist for the entire run. */
Cypress.Commands.add('loginByApi', ({ username, password, baseUrl }) => {
    const HAS_API_AUTH_LOGIN_ENV_KEY = 'hasApiAuthLogin'
    const hasApiAuthLogin = Cypress.env(HAS_API_AUTH_LOGIN_ENV_KEY)
    const hasApiAuthLoginUnknown = typeof hasApiAuthLogin !== 'boolean'
    const apiAuthLoginOptions = {
        url: `${baseUrl}/api/auth/login`,
        method: 'POST',
        followRedirect: !hasApiAuthLoginUnknown,
        failOnStatusCode: !hasApiAuthLoginUnknown,
        body: {
            username: username,
            password: password,
        },
    }
    const legacyLoginOptions = {
        url: `${baseUrl}/dhis-web-commons-security/login.action`,
        method: 'POST',
        form: true,
        followRedirect: true,
        body: {
            j_username: username,
            j_password: password,
            '2fa_code': '',
        },
    }

    // Set base url for the app platform
    window.localStorage.setItem('DHIS2_BASE_URL', baseUrl)

    if (hasApiAuthLoginUnknown) {
        return cy.request(apiAuthLoginOptions).then((response) => {
            if (response.status === 404 || response.status === 302) {
                return cy.request(legacyLoginOptions).then((legacyResponse) => {
                    if (legacyResponse.status === 200) {
                        Cypress.env(HAS_API_AUTH_LOGIN_ENV_KEY, false)
                        cy.log('Using legacy login endpoint for this test run')
                    }
                    return cy.wrap(legacyResponse)
                })
            }
            if (response.status === 200) {
                Cypress.env(HAS_API_AUTH_LOGIN_ENV_KEY, true)
                cy.log('Using web API login endpoint for this test run')
            }
            return cy.wrap(response)
        })
    } else if (hasApiAuthLogin === true) {
        return cy.request(apiAuthLoginOptions)
    } else {
        return cy.request(legacyLoginOptions)
    }
})
