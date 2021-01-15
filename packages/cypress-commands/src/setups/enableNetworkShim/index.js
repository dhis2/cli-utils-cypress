import { isDisabledMode, isCaptureMode } from './utils.js'
import captureRequests from './captureRequests.js'
import stubRequests from './stubRequests.js'
import validateVersionMinor from './validateVersionMinor.js'

export function enableNetworkShim() {
    if (isDisabledMode()) {
        return
    }

    before(() => {
        cy.task('getNetworkShimState').as('networkShimState')
        if (isCaptureMode()) {
            validateVersionMinor()
        }
    })
<<<<<<< HEAD

    beforeEach(() => {
        createStateFromFixtures({
            hosts,
            staticResources,
        }).then(networkShimState => {
            cy.wrap(networkShimState).as('networkShimState')
=======
>>>>>>> 5ce7597... refactor: make the network shim cypress-plugin based

            if (isCaptureMode()) {
                captureRequests(networkShimState)
            } else {
                stubRequests(networkShimState)
            }
        })
    })

<<<<<<< HEAD
    afterEach(() => {
        cy.get('@networkShimState').then(networkShimState => {
            if (isCaptureMode()) {
                createFixturesFromState(networkShimState)
            }
        })
=======
    after(() => {
        if (isCaptureMode()) {
            cy.get('@networkShimState').then(networkShimState => {
                cy.task('setNetworkShimState', networkShimState)
            })
        }
>>>>>>> 5ce7597... refactor: make the network shim cypress-plugin based
    })
}
