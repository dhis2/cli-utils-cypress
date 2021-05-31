const log = require('@dhis2/cli-helpers-engine').reporter
const exec = require('@dhis2/cli-helpers-engine').exec
const { getCypressCommand } = require('./getCypressCommand.js')

exports.appStartAndCypress = ({ appStart, cypressOptions }) => {
    const { cmd, args } = getCypressCommand(cypressOptions)

    Promise.all([
        exec({ cmd: appStart, args: []}),
        exec({ cmd, args })
    ]).then(() => {
        cypressOptions.mode === 'run' && process.exit(0)
    }).catch(e => {
        log.error(e)
    })
}
