const log = require('@dhis2/cli-helpers-engine').reporter
const { bin } = require('@dhis2/cli-helpers-engine').exec
const { getCypressCommand } = require('./getCypressCommand.js')
const { appStartAndCypress } = require('./appStartAndCypress.js')

exports.execCypress = ({ appStart, cypressOptions }) => {
    if (!appStart) {
        const { cmd, args } = getCypressCommand(cypressOptions)

        log.info('"appStart" empty. Running cypress directly')
        bin(cmd, { args, cwd: process.cwd() })
    } else {
        appStartAndCypress({ appStart, cypressOptions })
    }
}
