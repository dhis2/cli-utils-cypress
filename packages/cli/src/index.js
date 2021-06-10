const { namespace } = require('@dhis2/cli-helpers-engine')

const command = namespace('cypress', {
    desc: 'DHIS2 Cypress tool',
    aliases: 'cy',
    builder: yargs => yargs.commandDir('commands'),
})

module.exports = command
