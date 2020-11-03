exports.getCypressCommand = ({
    mode,
    headless,
    port,
    tags,
    browser,
    config,
}) => {
    const cmd = 'npx'

    const modeArgs = mode === 'run' ? [...(headless ? [] : ['--headed'])] : []

    const args = [
        '--no-install',
        tags ? 'cypress-tags' : 'cypress',
        mode,
        ...(port ? ['--port', port] : []),
        ...(browser ? ['--browser', browser] : []),
        ...(config ? ['--config', config] : []),
        ...(tags ? ['--env', `TAGS=${tags}`] : []),
        ...modeArgs,
    ]

    const options = { args }
    return { cmd, options }
}
