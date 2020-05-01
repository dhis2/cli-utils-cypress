const log = require('@dhis2/cli-helpers-engine').reporter
const concurrently = require('concurrently')
const { cypress } = require('../tools/cypress.js')
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
        .option('appStart', appStart)
        .option('waitOn', waitOn)

exports.handler = argv => {
    log.info('d2-utils-cypress > run')

    const { appStart, headed, port, browser, waitOn } = argv

    const opts = {
        mode: 'run',
        headless: !headed,
        browser,
        port,
    }

    if (!appStart) {
        log.info('"appStart" empty. Running cypress directly')

        cypress(opts)
    } else {
        const cypressCommand = cypress({ ...opts, exec: false })
        const waitOnCommand = `npx --no-install wait-on ${waitOn}`
        const waitAndCypress = [waitOnCommand, cypressCommand].join(' && ')

        concurrently(
            [
                { command: appStart, name: 'app' },
                { command: waitAndCypress, name: 'cypress' },
            ],
            { kill: ['success'] }
        )
    }
}
