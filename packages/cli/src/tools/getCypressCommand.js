const { getCypressCommandEnvArgs } = require('./getCypressCommandEnvArgs')

exports.getCypressCommand = ({
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
}) => {
    const cmd = 'npx'

    const args = [
        '--no-install',
        tags ? 'cypress-tags' : 'cypress',
        mode,
        ...(port ? ['--port', port] : []),
        ...(browser ? ['--browser', browser] : []),
        ...(config ? ['--config', config] : []),
        ...getCypressCommandEnvArgs({
            capture,
            dhis2CoreUrl,
            serverMinorVersion,
            stub,
            tags,
        }),
        ...(config ? ['--config', config] : []),
        ...(headed ? ['--headed', headed] : []),
        ...(headless ? ['--headless', headless] : []),
    ]

    const options = { args }
    return { cmd, options }
}
