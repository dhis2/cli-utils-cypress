const path = require('path')

const CONSUMING_ROOT = path.join(process.cwd())

const CYPRESS_ROOT = path.join(CONSUMING_ROOT, 'cypress')

const CYPRESS_FIXTURES = path.join(CYPRESS_ROOT, 'fixtures')
const CYPRESS_INTEGRATION = path.join(CYPRESS_ROOT, 'integration')
const CYPRESS_PLUGINS = path.join(CYPRESS_ROOT, 'plugins')
const CYPRESS_SUPPORT = path.join(CYPRESS_ROOT, 'support')

module.exports = {
    CONSUMING_ROOT,
    CYPRESS_ROOT,
    CYPRESS_FIXTURES,
    CYPRESS_INTEGRATION,
    CYPRESS_PLUGINS,
    CYPRESS_SUPPORT,
}
