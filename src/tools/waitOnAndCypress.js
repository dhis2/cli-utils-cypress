const { getCypressCommand } = require('./getCypressCommand.js')
const concurrently = require('concurrently')

exports.waitOnAndCypress = ({ appStart, waitOn, cypressOptions }) => {
    const { cmd, options } = getCypressCommand(cypressOptions)
    const cypressCommand = [cmd, ...options.args].join(' ')
    const waitOnCommand = `npx --no-install wait-on ${waitOn}`
    const waitAndCypress = `${waitOnCommand} && ${cypressCommand}`

    concurrently(
        [
            { command: appStart, name: 'app' },
            { command: waitAndCypress, name: 'cypress' },
        ],
        { kill: ['success'] }
    )
}
