const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const log = require('@dhis2/cli-helpers-engine').reporter

const INITIAL_SUMMARY = {
    count: 0,
    totalResponseSize: 0,
    duplicates: 0,
    nonDeterministicResponses: 0,
    serverMinorVersion: 0,
    fixtureFiles: [],
}

exports.clearNetworkFixtures = serverMinorVersion => {
    try {
        const networkFixtureDir = path.join(
            process.cwd(),
            '/cypress/fixtures/network'
        )

        if (!fs.existsSync(networkFixtureDir)) {
            fs.mkdirSync(networkFixtureDir)
        }

        const versionMinorDir = path.join(
            networkFixtureDir,
            serverMinorVersion.toString()
        )

        if (fs.existsSync(versionMinorDir)) {
            rimraf.sync(versionMinorDir)
        }

        fs.mkdirSync(versionMinorDir)
        fs.writeFileSync(
            path.join(versionMinorDir, 'summary.json'),
            JSON.stringify(INITIAL_SUMMARY, null, 4)
        )
        log.info(
            `Cleared network fixture directory for version: ${serverMinorVersion}`
        )
    } catch (error) {
        throw new Error(
            `Encountered an error resetting the network fixtures: ${error.message}`
        )
    }
}
