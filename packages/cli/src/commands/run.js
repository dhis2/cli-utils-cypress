const log = require('@dhis2/cli-helpers-engine').reporter
const { execCypress } = require('../tools/execCypress.js')
const { appStart, waitOn } = require('./common/sharedCLIOptions.js')

exports.command = 'run'
exports.aliases = ['r']
exports.desc = 'Run Cypress tests'
exports.builder = yargs =>
    yargs
        .option('headed', {
            describe: 'Run in headed mode',
            type: 'boolean',
            default: false,
        })
        .option('tags', {
            describe: 'Use cucumber tags',
            type: 'string',
            default: '',
        })
        .option('appStart', appStart)
        .option('waitOn', waitOn)

exports.handler = argv => {
    const { appStart, headed, port, tags, browser, waitOn } = argv
    const cypressOptions = {
        mode: 'run',
        headless: !headed,
        browser,
        port,
        tags,
    }

    log.info('d2-utils-cypress > run')
    execCypress({ appStart, waitOn, cypressOptions })
}
