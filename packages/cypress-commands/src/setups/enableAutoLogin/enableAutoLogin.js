import { getPublicValue, getSensitiveValues } from '../../helper/envHelpers.js'
import { isStubMode } from '../enableNetworkShim/index.js'

export const enableAutoLogin = ({
    username: _username,
    password: _password,
    baseUrl: _baseUrl,
} = {}) => {
    if (isStubMode()) {
        return
    }

    const baseUrl = _baseUrl || getPublicValue('dhis2BaseUrl')

    const createSession = () =>
        getSensitiveValues(['dhis2Username', 'dhis2Password']).then(
            (envVars) => {
                const username = _username || envVars.dhis2Username
                const password = _password || envVars.dhis2Password

                cy.session(
                    'user',
                    () => {
                        // Not using the login form to log in as that's the
                        // recommendation by cypress:
                        // * https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Fully-test-the-login-flow----but-only-once
                        // * https://docs.cypress.io/api/commands/session#Multiple-login-commands
                        cy.loginByApi({ username, password, baseUrl })
                    },
                    {
                        cacheAcrossSpecs: true,
                        validate: () => {
                            cy.validateUserIsLoggedIn({ baseUrl, username })
                        },
                    }
                )
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
