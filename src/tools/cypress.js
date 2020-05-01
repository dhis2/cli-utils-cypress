const { run } = require('../utils/run.js')

exports.cypress = ({ mode, headless, port, browser, config, exec = true }) => {
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

    if (exec) {
        console.log(process.cwd())
        return run(cmd, { args })
    }

    return [cmd, ...args].join(' ')
}
