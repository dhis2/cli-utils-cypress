import { isStubMode, getNetworkFixturesDir } from './utils'

function parseFixtureFiles(fileNames) {
    return cy
        .all(
            ...fileNames.map(fileName => () =>
                cy.readFile(`${getNetworkFixturesDir()}/requests/${fileName}`)
            )
        )
        .then(results => results.flat())
}

export default function createStateFromFixtures({
    hosts,
    fixtureMode,
    staticResources,
}) {
    try {
        const serverMinorVersion = Cypress.env('dhis2_server_minor_version')
        const config = {
            serverMinorVersion,
            hosts,
            fixtureMode,
            staticResources,
            mode: Cypress.env('dhis2_api_stub_mode'),
        }

        return cy
            .readFile(`${getNetworkFixturesDir()}/summary.json`)
            .then(({ fixtureFiles, ...summary }) =>
                parseFixtureFiles(fixtureFiles).then(requests => ({
                    ...summary,
                    requests: isStubMode()
                        ? requests.map(request => ({
                              ...request,
                              stubResponseCount: 0,
                          }))
                        : requests,
                    config,
                }))
            )
    } catch (error) {
        console.error('NetworkShim capture mode initialzation error', error)
    }
}
