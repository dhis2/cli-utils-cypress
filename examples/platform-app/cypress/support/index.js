import { enableAutoLogin, enableNetworkShim } from '@dhis2/cypress-commands'

enableNetworkShim()

if (Cypress.env('dhis2_api_stub_mode') !== 'STUB') {
    enableAutoLogin()
}
