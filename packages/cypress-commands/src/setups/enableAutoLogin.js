/* globals before */
import { LOGIN_ENDPOINT } from '../constants'

export const enableAutoLogin = () => {
    // This will authenticate and set the session cookie
    const username = Cypress.env('dhis2_username')
    const password = Cypress.env('dhis2_password')
    const loginUrl = Cypress.env('dhis2_base_url')

    if (!loginUrl) {
        throw new Error(
            'No `dhis2_base_url` found. Please make sure to add it to `cypress.env.json`'
        )
    }

    before(() => {
        // Persist this across tests so we don't have to login before each test
        Cypress.Cookies.defaults({
            whitelist: 'JSESSIONID',
        })

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
    })

    beforeEach(() => {
        // This ensures the app platform knows which URL to use even if REACT_APP_DHIS2_BASE_URL is undefined
        // It also ensures that the value from the cypress env is used instead of REACT_APP_DHIS2_BASE_URL
        localStorage.setItem('DHIS2_BASE_URL', loginUrl)
    })
}
