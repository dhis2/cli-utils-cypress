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
    const cmd = tags ? 'cypress-tags' : 'cypress'

    const args = [
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

    return { cmd, args }
}
