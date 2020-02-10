const { run } = require('../utils/run.js')

exports.cypress = ({ mode, headless, port, browser, config }) => {
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

    console.log(process.cwd())
    run(cmd, { args })
}
