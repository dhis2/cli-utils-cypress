const log = require('@dhis2/cli-helpers-engine').reporter
const { execCypress } = require('../tools/execCypress.js')
const {
    appStart,
    config,
    port,
    // serverMinorVersion,
    // stub,
    waitOn,
} = require('./common/sharedCLIOptions.js')

exports.command = 'open'
exports.aliases = ['o']
exports.desc = 'Open Cypress UI'
exports.builder = yargs =>
    yargs
        .option('appStart', appStart)
        .option('config', config)
        .option('port', port)
        /*
         * TODO: Add these options to the open command once
         * cypress has ensured that the `before` and `after`
         * hook work identical when running `cy run` and
         * when running `cy open` and then clicking "run all specs"/
         * See: https://github.com/cypress-io/cypress/issues/7313#issuecomment-628402317
         */
        // .option('serverMinorVersion', serverMinorVersion)
        // .option('stub', stub)
        .option('waitOn', waitOn)

exports.handler = argv => {
    const { appStart, waitOn, ...argvRest } = argv
    const cypressOptions = { mode: 'open', ...argvRest }

    log.info('d2-utils-cypress > open')
    execCypress({ appStart, waitOn, cypressOptions })
}
