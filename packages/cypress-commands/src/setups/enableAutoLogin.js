import { isStubMode } from '../helper/networkMode.js'

export const enableAutoLogin = () => {
    if (isStubMode()) {
        return
    }

    before(() => {
        /*
         * At the very start of a capture run the server version
         * is evaluated. This is done by querying the `system/info`
         * endpoint which requires authentication. So if there is no
         * valid session at the start of the run, we'd better log in.
         */
        cy.getCookie('JSESSIONID').then((cookie) => {
            if (!cookie) {
                cy.login()
            }
        })
    })

    beforeEach(() => {
        cy.login()
    })
}
