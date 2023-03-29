import { isStubMode } from '../helper/networkMode.js'

export const enableAutoLogin = ({
    username: _username,
    password: _password,
    baseUrl: _baseUrl,
} = {}) => {
    if (isStubMode()) {
        return
    }

    const name = _username || Cypress.env('dhis2Username')
    const password = _password || Cypress.env('dhis2Password')
    const server = _baseUrl || Cypress.env('dhis2BaseUrl')
    const createSession = () =>
        cy.session(
            'user',
            () => {
                cy.visit('/')
                cy.fillInLoginForm({ name, password, server })
                cy.get('#dhis2-app-root > *').should('exist')
            },
            {
                cacheAcrossSpecs: true,
                validate: () => {
                    cy.get('h1:contains("Please sign in")').should('not.exist')
                },
            }
        )

    before(() => {
        /*
         * At the very start of a capture run the server version
         * is evaluated. This is done by querying the `system/info`
         * endpoint which requires authentication. So if there is no
         * valid session at the start of the run, we'd better log in.
         */
        cy.getCookie('JSESSIONID').then((cookie) => {
            if (!cookie) {
                createSession()
            }
        })
    })

    beforeEach(() => {
        createSession()
    })
}
