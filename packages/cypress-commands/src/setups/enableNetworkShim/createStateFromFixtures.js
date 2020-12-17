import { isStubMode } from './utils'

export default function createStateFromFixtures({ hosts, staticResources }) {
    try {
        const serverMinorVersion = Cypress.env('dhis2_server_minor_version')
        const config = {
            serverMinorVersion,
            hosts,
            staticResources,
            mode: Cypress.env('dhis2_api_stub_mode'),
        }

        return cy
            .fixture(`${getNetworkFixturesDir()}/summary.json`)
            .then(({ fixtureFiles, ...summary }) =>
                parseFixtureFiles(fixtureFiles).then(requestStubs => ({
                    ...summary,
                    requestStubs: isStubMode()
                        ? requestStubs.map(requestStub => ({
                              ...requestStub,
                              responseCount: 0,
                          }))
                        : requestStubs,
                    config,
                }))
            )
    } catch (error) {
        console.error('NetworkShim capture mode initialzation error', error)
    }
}

function parseFixtureFiles(fileNames) {
    return cy
        .all(
            ...fileNames.map(fileName => () =>
                cy.fixture(`${getNetworkFixturesDir()}/${fileName}`)
            )
        )
        .then(requestStubs => requestStubs.flat())
}

function getNetworkFixturesDir() {
    return `network/${Cypress.env('dhis2_server_minor_version')}`
}
