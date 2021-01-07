import { enableNetworkShim } from '@dhis2/cypress-commands'
import { resetDb } from '../../src/json-server/resetDb'

afterEach(() => {
    if (Cypress.env('dhis2_api_stub_mode') === 'CAPTURE') {
        resetDb()
    }
})
enableNetworkShim({ staticResources: ['animals'] })
