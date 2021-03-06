const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')
const rimraf = require('rimraf')

module.exports = function clearNetworkFixtures({ fixturesFolder, env }) {
    try {
        const apiVersion = env.dhis2ApiVersion.toString()
        const versionMinorDir = path.join(fixturesFolder, apiVersion)

        if (fs.existsSync(versionMinorDir)) {
            rimraf.sync(versionMinorDir)
        }

        log.info(`Cleared network fixture directory for version: ${apiVersion}`)
    } catch (error) {
        throw new Error(
            `Encountered an error resetting the network fixtures: ${error.message}`
        )
    }
}
