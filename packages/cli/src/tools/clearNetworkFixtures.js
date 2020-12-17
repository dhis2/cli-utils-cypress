const path = require('path')
const fs = require('fs-extra')
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
        const versionMinorDir = path.join(
            process.cwd(),
            /* 
            TODO: this assumes the fixture dir is always the same.
            Ideally the fixture folder should be read from the 
            cypress config. However this code is completely 
            independant and does not have access to this config.
            We should refactor this part of the code to be in 
            a cypress plugin so it could access cypress config.
            Related: https://github.com/cypress-io/cypress/issues/2840
             */
            '/cypress/fixtures/network',
            serverMinorVersion.toString()
        )

        if (fs.existsSync(versionMinorDir)) {
            rimraf.sync(versionMinorDir)
        }

        fs.ensureDirSync(versionMinorDir)
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
