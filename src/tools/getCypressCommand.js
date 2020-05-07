exports.getCypressCommand = ({ mode, headless, port, browser, config }) => {
    const cmd = 'npx'

    const modeArgs = mode === 'run' ? [...(headless ? [] : ['--headed'])] : []

    const args = [
        '--no-install',
        'cypress',
        mode,
        ...(port ? ['--port', port] : []),
        ...(browser ? ['--browser', browser] : []),
        ...(config ? ['--config', config] : []),
        ...modeArgs,
    ]

    const options = { args }
    return { cmd, options }
}
