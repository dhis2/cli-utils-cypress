const { run } = require('../utils/run.js')

exports.cypress = ({ mode, headless, port, browser, config, tags }) => {
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

    console.log(process.cwd())
    run(cmd, { args })
}
