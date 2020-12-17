export default function createFixturesFromState(state) {
    const dir = getNetworkFixturesDir()
    const summary = {
        count: state.count,
        totalResponseSize: state.totalResponseSize,
        duplicates: state.duplicates,
        nonDeterministicResponses: state.nonDeterministicResponses,
        serverMinorVersion: state.config.serverMinorVersion,
        fixtureFiles: [],
    }
    const files = state.requestStubs.reduce(
        (acc, request) => {
            const fileName = request.static
                ? 'static_resources'
                : request.testName
                      .split(' -- ')[0]
                      .toLowerCase()
                      .replaceAll(' ', '_')

            if (!acc[fileName]) {
                acc[fileName] = []
                acc.summary.fixtureFiles.push(`${fileName}.json`)
            }

            acc[fileName].push(request)
            return acc
        },
        { summary }
    )

    for (const [name, requestStubs] of Object.entries(files)) {
        cy.writeFile(`${dir}/${name}.json`, requestStubs)
    }

    cy.log(
        `Networkshim successfully captured ${state.requestStubs.length} requests`
    )
}

function getNetworkFixturesDir() {
    return [
        Cypress.config('fixturesFolder'),
        'network',
        Cypress.env('dhis2_server_minor_version'),
    ].join('/')
}
