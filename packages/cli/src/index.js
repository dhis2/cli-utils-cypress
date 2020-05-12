const { namespace } = require('@dhis2/cli-helpers-engine')

const command = namespace('cypress', {
    desc: 'DHIS2 Cypress tool',
    aliases: 'cy',
    builder: yargs =>
        yargs
            .option('port', {
                describe: 'Port to run Cypress on',
                type: 'string',
                default: '54321',
            })
            .option('browser', {
                describe:
                    'Browser name or path to browser binary to use for Cypress tests',
            })
            .commandDir('commands'),
})

module.exports = command
