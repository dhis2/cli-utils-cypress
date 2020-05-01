const fs = require('fs-extra')
const {
    CYPRESS_ROOT,
    CYPRESS_FIXTURES,
    CYPRESS_INTEGRATION,
    CYPRESS_PLUGINS,
    CYPRESS_SUPPORT,
} = require('../../utils/paths.js')

const ensureDirectories = () => {
    fs.ensureDirSync(CYPRESS_ROOT)
    fs.ensureDirSync(CYPRESS_FIXTURES)
    fs.ensureDirSync(CYPRESS_INTEGRATION)
    fs.ensureDirSync(CYPRESS_PLUGINS)
    fs.ensureDirSync(CYPRESS_SUPPORT)
}

module.exports = { ensureDirectories }
