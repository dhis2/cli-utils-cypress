const log = require('@dhis2/cli-helpers-engine').reporter
const { execCypress } = require('../tools/execCypress.js')
const {
    appStart,
    config,
    port,
    serverMinorVersion,
    stub,
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

exports.handler = argv => {
    const { appStart, ...argvRest } = argv
    const cypressOptions = { mode: 'run', ...argvRest }

    log.info('d2-utils-cypress > run')
    execCypress({ appStart, cypressOptions })
}
