const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')

const ensureDirectories = paths => {
    log.debug('Ensure that the cypress directories are present')
    fs.ensureDirSync(paths.CYPRESS_ROOT)
    fs.ensureDirSync(paths.CYPRESS_FIXTURES)
    fs.ensureDirSync(paths.CYPRESS_INTEGRATION)
    fs.ensureDirSync(paths.CYPRESS_PLUGINS)
    fs.ensureDirSync(paths.CYPRESS_SUPPORT)
}

module.exports = { ensureDirectories }
