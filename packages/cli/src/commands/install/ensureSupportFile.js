const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')
const { copy } = require('../../utils/fs.js')

module.exports.ensureSupportFile = paths => {
    if (fs.existsSync(paths.CYPRESS_SUPPORT_FILE_DESTINATION)) {
        log.debug('Support file already exists')
        return
    }

    log.info('Copying support file template')
    log.debug(`Plugin file location: ${paths.CYPRESS_SUPPORT_FILE_DESTINATION}`)
    copy(
        paths.CYPRESS_SUPPORT_FILE_SOURCE,
        paths.CYPRESS_SUPPORT_FILE_DESTINATION
    )
}
