const log = require('@dhis2/cli-helpers-engine').reporter
const concurrently = require('concurrently')
const { getCypressCommand } = require('./getCypressCommand.js')

exports.appStartAndCypress = ({ appStart, cypressOptions }) => {
    const { cmd, options } = getCypressCommand(cypressOptions)
    const cypressCommand = [cmd, ...options.args].join(' ')

    // reflects the position of the cypress command passed to concurrently
    const cypressCommandIndex = 1

    concurrently(
        [
            { command: appStart, name: 'app' },
            { command: cypressCommand, name: 'cypress' },
        ],
        { killOthers: ['success', 'failure'] }
    ).then(
        () => {
            cypressOptions.mode === 'run' && process.exit(0)
        },
        e => {
            if (!e || !e.length) {
                log.error('No commands have been executed')
                process.exit(1)
            }

            const cypressResult = e.find(
                ({ index }) => index === cypressCommandIndex
            )

            if (!cypressResult) {
                log.error('The cypress command has not been executed')
                process.exit(1)
            }

            if (typeof cypressResult.exitCode !== 'number') {
                log.error('Unexpected result')
            }

            // sometimes e will contain objects with an exit code
            if (cypressResult.exitCode === 0) {
                process.exit(0)
            }

            log.error('The cypress command exited with a non-zero code')
            process.exit(cypressResult.exitCode)
        }
    )
}
