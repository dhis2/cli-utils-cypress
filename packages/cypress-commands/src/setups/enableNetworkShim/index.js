import { isDisabledMode, isCaptureMode } from './utils.js'
import captureRequests from './captureRequests.js'
import stubRequests from './stubRequests.js'
import validateVersionMinor from './validateVersionMinor.js'

export function enableNetworkShim() {
    if (isDisabledMode()) {
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
        cy.task('getNetworkShimState').then(networkShimState => {
            cy.wrap(networkShimState).as('networkShimState')

            if (isCaptureMode()) {
                // This will mutate the state
                captureRequests(networkShimState)
            } else {
                stubRequests(networkShimState)
            }
        })
    })

    afterEach(() => {
        if (!isDisabledMode()) {
            // First get the updated local state from the alias
            cy.get('@networkShimState').then(networkShimState => {
                // Then update the plugin state
                cy.task('setNetworkShimState', networkShimState)
            })
        }
    })
}
