const log = require('@dhis2/cli-helpers-engine').reporter
const { execCypress } = require('../tools/execCypress.js')
const {
    appStart,
    config,
    port,
    serverMinorVersion,
    stub,
    waitOn,
} = require('./common/sharedCLIOptions.js')

exports.command = 'run'
exports.aliases = ['r']
exports.desc = 'Run Cypress tests'
exports.builder = yargs =>
    yargs
        .option('appStart', appStart)
        .option('browser', {
            describe: 'Browser name or filesystem path',
            type: 'string',
            // TODO: Should default to electron but the network shim
            // will require support for 304s for that
            default: 'chrome',
        })
        .option('capture', {
            describe: 'Enable netowrk shim capture mode',
            type: 'boolean',
            default: false,
            implies: 'serverMinorVersion',
        })
        .option('config', config)
        .option('dhis2CoreUrl', {
            describe: 'DHIS2 core instance url',
            type: 'string',
            default: '',
            conflicts: ['--no-capture'],
        })
        .option('headed', {
            describe: 'Run in headed mode',
            type: 'boolean',
            default: false,
        })
        .option('headless', {
            describe: 'Run in headless mode',
            type: 'boolean',
            default: true,
        })
        .option('port', port)
        .option('serverMinorVersion', serverMinorVersion)
        .option('stub', stub)
        .option('tags', {
            describe: 'Use cucumber tags',
            type: 'string',
            default: '',
        })
        .option('waitOn', waitOn)

exports.handler = argv => {
    const { appStart, waitOn, ...argvRest } = argv
    const cypressOptions = { mode: 'run', ...argvRest }

    log.info('d2-utils-cypress > run')
    execCypress({ appStart, waitOn, cypressOptions })
}
