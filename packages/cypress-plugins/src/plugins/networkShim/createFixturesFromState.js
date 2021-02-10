const fs = require('fs')
const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const { getFixturesDir } = require('./utils.js')

/**
 * @description
 * Creates JSON files from state object
 * @param {NetworkShimState} state
 * @param {Object} Cypress config
 * @returns {void}
 */
module.exports = function createFixturesFromState(state, cypressConfig) {
    const fixturesDir = getFixturesDir(cypressConfig)
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
        fs.writeFileSync(
            path.join(fixturesDir, `${name}.json`),
            JSON.stringify(requestStubs, null, 4)
        )
    }

    log.info(
        `Networkshim successfully captured ${state.requestStubs.length} requests`
    )
}
