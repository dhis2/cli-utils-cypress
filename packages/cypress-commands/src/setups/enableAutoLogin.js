import { isStubMode } from '../helper/networkMode.js'

export const enableAutoLogin = () => {
    if (isStubMode()) {
        return
    }

    beforeEach(() => {
        cy.login()
    })
}
