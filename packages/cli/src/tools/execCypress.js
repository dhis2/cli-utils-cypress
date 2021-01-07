const log = require('@dhis2/cli-helpers-engine').reporter
const { run } = require('../utils/run.js')
const { getCypressCommand } = require('./getCypressCommand.js')
const { waitOnAndCypress } = require('./waitOnAndCypress.js')
const { clearNetworkFixtures } = require('./clearNetworkFixtures.js')

exports.execCypress = ({ appStart, waitOn, cypressOptions }) => {
    if (cypressOptions.capture) {
        clearNetworkFixtures(cypressOptions.serverMinorVersion)
    }

    if (!appStart) {
        const { cmd, options } = getCypressCommand(cypressOptions)

        log.info('"appStart" empty. Running cypress directly')
        run(cmd, options)
    } else {
        waitOnAndCypress({ appStart, waitOn, cypressOptions })
    }
}
