const log = require('@dhis2/cli-helpers-engine').reporter

const { cypress } = require('../tools/cypress.js')

exports.command = 'run'

exports.aliases = ['r']

exports.desc = 'Run Cypress tests'

exports.builder = yargs =>
    yargs.option('headed', {
        describe: 'Run in headed mode',
        type: 'boolean',
        default: false,
    })

exports.handler = argv => {
    log.info('d2-utils-cypress > run')

    const { headed, port, browser } = argv

    const opts = {
        mode: 'run',
        headless: !headed,
        browser,
        port,
    }

    cypress(opts)
}