import {
    isDisabledMode,
    isStubMode,
    isCaptureMode,
    setBaseUrlToLocalStorage,
} from './utils.js'
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
            }
            if (isStubMode()) {
                // This is needed to ensure the app-shell doesn't lose its reference
                // to the server baseUrl
                setBaseUrlToLocalStorage()
                // This also mutates the state
                stubRequests(networkShimState)
            }
        })
    })

    afterEach(() => {
        if (!isDisabledMode()) {
            // First get the updated local state from the alias
            cy.get('@networkShimState').then(networkShimState => {
                /*
                 * In capture mode the state needs to be incrementally updated
                 * across tests, so after every feature the entire plugin state
                 * gets overwritten.
                 */
                if (isCaptureMode()) {
                    cy.task('setNetworkShimState', networkShimState)
                }
                /*
                 * In stub mode the state needs to be kept static across features
                 * apart from the missing request stubs which do need to be
                 * incrementally updated across features. So in stub mode we only
                 * update that state property in the plugin.
                 */
                if (isStubMode()) {
                    cy.task(
                        'setNetworkShimMissingRequestStubs',
                        networkShimState.missingRequestStubs
                    )
                }
            })
        }
    })
}
