const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')
const { copy } = require('../../utils/fs.js')

module.exports.ensureCypressEnvJson = paths => {
    if (fs.existsSync(paths.CYPRESS_ENV_JSON_DESTINATION)) {
        log.debug('cypress.env.json already exists')
        return
    }

    log.info('Copying cypress.env.json template')
    log.debug(
        `cypress.env.json file location: ${paths.CYPRESS_ENV_JSON_DESTINATION}`
    )
    copy(paths.CYPRESS_ENV_JSON_SOURCE, paths.CYPRESS_ENV_JSON_DESTINATION)
}
