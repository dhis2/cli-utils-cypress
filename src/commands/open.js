const log = require('@dhis2/cli-helpers-engine').reporter
const { execCypress } = require('../tools/execCypress.js')
const { appStart, waitOn } = require('./common/sharedCLIOptions.js')

exports.command = 'open'
exports.aliases = ['o']
exports.desc = 'Open Cypress UI'
exports.builder = yargs =>
    yargs.option('appStart', appStart).option('waitOn', waitOn)

exports.handler = argv => {
    const { appStart, port, browser, waitOn } = argv
    const cypressOptions = { mode: 'open', browser, port }

    log.info('d2-utils-cypress > open')
    execCypress({ appStart, waitOn, cypressOptions })
}
