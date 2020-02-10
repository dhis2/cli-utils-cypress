const log = require('@dhis2/cli-helpers-engine').reporter

const { cypress } = require('../tools/cypress.js')

exports.command = 'open'

exports.aliases = ['o']

exports.desc = 'Open Cypress UI'

exports.builder = {}

exports.handler = argv => {
    log.info('d2-utils-cypress > open')

    const { port, browser } = argv

    const opts = {
        mode: 'open',
        browser,
        port,
    }

    cypress(opts)
}
