const path = require('path')
const fs = require('fs-extra')
const rimraf = require('rimraf')
const log = require('@dhis2/cli-helpers-engine').reporter

module.exports = function clearNetworkFixtures({ fixturesFolder, env }) {
    try {
        const serverMinorVersion = env.dhis2_server_minor_version.toString()
        const versionMinorDir = path.join(fixturesFolder, serverMinorVersion)

        if (fs.existsSync(versionMinorDir)) {
            rimraf.sync(versionMinorDir)
        }

        log.info(
            `Cleared network fixture directory for version: ${serverMinorVersion}`
        )
    } catch (error) {
        throw new Error(
            `Encountered an error resetting the network fixtures: ${error.message}`
        )
    }
}
