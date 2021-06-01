const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')
const { copy } = require('../../utils/fs.js')

module.exports.ensurePluginsFile = paths => {
    if (fs.existsSync(paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION)) {
        log.debug(
            `"${paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION}" already exists`
        )
        return
    }

    log.info('Copying plugin file template')
    log.debug(
        `Plugin file location: ${paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION}`
    )
    copy(
        paths.CYPRESS_PLUGIN_TEMPLATE_SOURCE,
        paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION
    )
}
