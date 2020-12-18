const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')
const { copy } = require('../../utils/fs.js')

module.exports.ensureCypressCucumberPreprocessorJson = paths => {
    if (fs.existsSync(paths.CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION)) {
        log.debug(
            `"${paths.CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION}" already exists`
        )
        return
    }

    log.info('Copying .cypress-cucumber-preprocessorrc.json template')
    log.debug(
        `.cypress-cucumber-preprocessorrc.json location: ${paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION}`
    )
    copy(
        paths.CYPRESS_CUCUMBER_PREPROCESSOR_JSON_SOURCE,
        paths.CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION
    )
}
