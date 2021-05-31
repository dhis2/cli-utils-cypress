const log = require('@dhis2/cli-helpers-engine').reporter
const { bin } = require('@dhis2/cli-helpers-engine').exec
const { getCypressCommand } = require('./getCypressCommand.js')

exports.execCypress = ({ cypressOptions }) => {
    const { cmd, args } = getCypressCommand(cypressOptions)
    bin(cmd, { args, cwd: process.cwd() })
}
