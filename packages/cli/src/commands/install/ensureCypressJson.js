const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')
const { copy } = require('../../utils/fs.js')

module.exports.ensureCypressJson = paths => {
    if (fs.existsSync(paths.CYPRESS_JSON_DESTINATION)) {
        log.debug('Cypress config file already exists')
        return
    }

    log.info('Copying cypress config file template')
    log.debug(`Cypress config location: ${paths.CYPRESS_JSON_DESTINATION}`)

    copy(paths.CYPRESS_JSON_SOURCE, paths.CYPRESS_JSON_DESTINATION)
}
