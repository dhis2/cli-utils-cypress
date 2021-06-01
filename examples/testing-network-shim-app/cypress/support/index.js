import { enableNetworkShim } from '@dhis2/cypress-commands'
import { resetDb } from '../../src/json-server/resetDb'

afterEach(() => {
    if (Cypress.env('DHIS2_API_STUB_MODE') === 'CAPTURE') {
        resetDb()
    }
})
enableNetworkShim()
