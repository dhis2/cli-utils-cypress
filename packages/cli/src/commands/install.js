const log = require('@dhis2/cli-helpers-engine').reporter

module.exports.command = 'install'
module.exports.aliases = ['i']
module.exports.desc = 'This command (and cli utility) has been decomissioned and no longer works. Please refer to the docs for more information'
module.exports.builder = {}
module.exports.handler = () => {
    log.info(module.exports.desc)
    process.exit(1)
}
