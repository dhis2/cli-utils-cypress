import { getNetworkFixturesDir } from './utils'

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
    const files = state.requests.reduce(
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

    for (const [name, requests] of Object.entries(files)) {
        const filePath =
            name === 'summary' ? `${dir}/${name}` : `${dir}/requests/${name}`

        cy.writeFile(`${filePath}.json`, requests)
    }

    cy.log(
        `Networkshim successfully captured ${state.requests.length} requests`
    )
}
