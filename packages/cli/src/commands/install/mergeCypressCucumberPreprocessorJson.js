const log = require('@dhis2/cli-helpers-engine').reporter
const { read, write } = require('../../utils/fs.js')

module.exports.mergeCypressCucumberPreprocessorJson = (
    cypressCucumberPreprocessorJson,
    paths
) => {
    const plainTextContents = read(
        paths.CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION
    )
    const parsedContents = JSON.parse(plainTextContents)
    const newContents = {
        ...parsedContents,
        ...cypressCucumberPreprocessorJson,
    }
    const stringifiedContents = JSON.stringify(newContents, null, 4)

    log.info('Adding new entries to the cypress.json')
    log.debug(
        `In path: ${paths.CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION}`
    )
    write(
        paths.CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION,
        stringifiedContents,
        true
    )
}
