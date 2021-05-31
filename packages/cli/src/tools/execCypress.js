const log = require('@dhis2/cli-helpers-engine').reporter
const { bin } = require('@dhis2/cli-helpers-engine').exec
const { getCypressCommandEnvArgs } = require('./getCypressCommandEnvArgs.js')

exports.execCypress = ({ cypressOptions }) => {
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

    bin(cmd, { args, cwd: process.cwd() })
}
