const log = require('@dhis2/cli-helpers-engine').reporter
const { read, write } = require('../../utils/fs.js')

module.exports.mergeCypressEnvJsonContents = (cypressEnvJson, paths) => {
    const plainTextContents = read(paths.CYPRESS_ENV_JSON_DESTINATION)
    const parsedContents = JSON.parse(plainTextContents)
    const newContents = { ...parsedContents, ...cypressEnvJson }
    const stringifiedContents = JSON.stringify(newContents, null, 4)

    log.info('Adding new entries to the cypress.env.json')
    log.debug(`In path: ${paths.CYPRESS_ENV_JSON_DESTINATION}`)
    write(paths.CYPRESS_ENV_JSON_DESTINATION, stringifiedContents, true)
}
