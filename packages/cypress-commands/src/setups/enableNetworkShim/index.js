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
        createStateFromFixtures({
            hosts,
            staticResources,
        }).then(state => {
            cy.wrap(state).as('networkShimState')
        })
    })

    beforeEach(() => {
        cy.get('@networkShimState').then(networkShimState => {
            if (isCaptureMode()) {
                captureRequests(networkShimState)
            } else {
                stubRequests(networkShimState)
            }
        })
    })

    after(() => {
        cy.get('@networkShimState').then(networkShimState => {
            if (isCaptureMode()) {
                createFixturesFromState(networkShimState)
            }
        })
    })
}
