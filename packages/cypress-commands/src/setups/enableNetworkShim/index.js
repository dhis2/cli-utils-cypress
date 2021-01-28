import {
    isDisabledMode,
    isCaptureMode,
    getDefaultHosts,
    getDefaultStaticResources,
} from './utils.js'
import createStateFromFixtures from './createStateFromFixtures.js'
import captureRequests from './captureRequests.js'
import stubRequests from './stubRequests.js'
import createFixturesFromState from './createFixturesFromState.js'
import validateVersionMinor from './validateVersionMinor.js'

export function enableNetworkShim({
    hosts = getDefaultHosts(),
    staticResources = getDefaultStaticResources(),
} = {}) {
    if (isDisabledMode()) {
        return
    }

    before(() => {
        if (isCaptureMode()) {
            validateVersionMinor()
        }
    })

    beforeEach(() => {
        createStateFromFixtures({
            hosts,
            staticResources,
        }).then(networkShimState => {
            cy.wrap(networkShimState).as('networkShimState')

            if (isCaptureMode()) {
                captureRequests(networkShimState)
            } else {
                stubRequests(networkShimState)
            }
        })
    })

    afterEach(() => {
        cy.get('@networkShimState').then(networkShimState => {
            if (isCaptureMode()) {
                createFixturesFromState(networkShimState)
            }
        })
    })
}
