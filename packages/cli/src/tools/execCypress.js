const { bin } = require('@dhis2/cli-helpers-engine').exec
const log = require('@dhis2/cli-helpers-engine').reporter
const { exit } = require('@dhis2/cli-helpers-engine')
const { findProjectRoot } = require('@dhis2/cli-helpers-engine')
const findup = require('find-up')
const waiton = require('wait-on')
const { readJson } = require('../utils/fs.js')
const { getCypressCommandEnvArgs } = require('./getCypressCommandEnvArgs.js')

const loadCypressConfig = () => {
    const cypressjson = findup.sync('cypress.json', { type: 'file' })

    let cyConf = {}
    if (cypressjson) {
        cyConf = readJson(cypressjson)
    }

    log.debug(
        `Resolved Cypress configuration:\n ${JSON.stringify(cyConf, null, 2)}`
    )

    return cyConf
}

exports.execCypress = ({ cypressOptions }) => {
    const cwd = findProjectRoot()

    if (!cwd) {
        exit(1, 'Could not find project root.')
    }

    const {
        browser,
        capture,
        config,
        dhis2CoreUrl,
        headed,
        headless,
        mode,
        port,
        serverMinorVersion,
        stub,
        tags,
    } = cypressOptions

    const cmd = tags ? 'cypress-tags' : 'cypress'

    const args = [
        mode,
        ...(port ? ['--port', port] : []),
        ...(browser ? ['--browser', browser] : []),
        ...(config ? ['--config', config] : []),
        ...(headed ? ['--headed', headed] : []),
        ...(headless ? ['--headless', headless] : []),
        ...getCypressCommandEnvArgs({
            capture,
            dhis2CoreUrl,
            serverMinorVersion,
            stub,
            tags,
        }),
    ]

    const cyConf = loadCypressConfig()

    if (!cyConf.baseUrl) {
        bin(cmd, { args, cwd })
    } else {
        waiton(
            {
                resources: [cyConf.baseUrl],
                timeout: 30 * 1000, // convert to ms
            },
            err => {
                if (err) {
                    exit(1, err)
                }
                bin(cmd, { args, cwd })
            }
        )
    }
}
