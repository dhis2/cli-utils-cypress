import './waitForResources.js'
import { setDhis2BaseUrlToLocalStorage } from '../../helper/dhis2BaseUrl.js'
import captureRequests from './captureRequests.js'
import { isLiveMode, isStubMode, isCaptureMode } from './networkMode.js'
import stubRequests from './stubRequests.js'
import validateVersionMinor from './validateVersionMinor.js'

export function enableNetworkShim() {
    if (isLiveMode()) {
        return
    }

    before(() => {
        if (isCaptureMode()) {
            validateVersionMinor()
        }
    })

    beforeEach(() => {
        // Get network state from plugin and make available as an alias
        // which can be accessed again in the afterEach lifecycle hook
        cy.task('getNetworkShimState').then((networkShimState) => {
            cy.wrap(networkShimState).as('networkShimState')

            if (isCaptureMode()) {
                // This will mutate the state
                captureRequests(networkShimState)
            }
            if (isStubMode()) {
                // This is needed to ensure the app-shell doesn't lose its reference
                // to the server baseUrl
                setDhis2BaseUrlToLocalStorage()
                // This also mutates the state
                stubRequests(networkShimState)
            }
        })
    })

    afterEach(() => {
        if (!isLiveMode()) {
            cy.waitForResources()

            // First get the updated local state from the alias
            cy.get('@networkShimState').then((networkShimState) => {
                /*
                 * In both capture and stub mode the state needs to be incrementally
                 * updated across tests, so after every feature the entire plugin state
                 * gets overwritten.
                 */
                cy.task('setNetworkShimState', networkShimState)
            })
        }
    })
}
