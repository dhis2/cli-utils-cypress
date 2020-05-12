const path = require('path')

const CONSUMING_ROOT = path.join(process.cwd())
const PACKAGE_JSON = path.join(CONSUMING_ROOT, 'package.json')
const TEMPLATES = path.join(__dirname, '../../templates')

const CYPRESS_ROOT = path.join(CONSUMING_ROOT, 'cypress')
const CYPRESS_FIXTURES = path.join(CYPRESS_ROOT, 'fixtures')
const CYPRESS_INTEGRATION = path.join(CYPRESS_ROOT, 'integration')
const CYPRESS_PLUGINS = path.join(CYPRESS_ROOT, 'plugins')
const CYPRESS_SUPPORT = path.join(CYPRESS_ROOT, 'support')
const CYPRESS_CONFIG_PATH = path.join(CONSUMING_ROOT, 'cypress.json')
const CYPRESS_CONFIG_ENV_PATH = path.join(CONSUMING_ROOT, 'cypress.env.json')
const CYPRESS_SUPPORT_FILE_SOURCE = path.join(TEMPLATES, 'support.js')
const CYPRESS_SUPPORT_FILE_DESTINATION = path.join(CYPRESS_SUPPORT, 'index.js')

const CUCUMBER_PLUGIN_TEMPLATE_SOURCE = path.join(TEMPLATES, 'plugins.js')
const CUCUMBER_PLUGIN_TEMPLATE_DESTINATION = path.join(
    CYPRESS_PLUGINS,
    'index.js'
)
const CUCUMBER_CONFIG_TEMPLATE_SOURCE = path.join(
    TEMPLATES,
    'cucumber-config.js'
)
const CUCUMBER_CONFIG_TEMPLATE_DESTINATION = path.join(
    CONSUMING_ROOT,
    'cypress-cucumber-preprocessor.config.js'
)

module.exports = {
    CONSUMING_ROOT,
    PACKAGE_JSON,
    TEMPLATES,

    CYPRESS_ROOT,
    CYPRESS_FIXTURES,
    CYPRESS_INTEGRATION,
    CYPRESS_PLUGINS,
    CYPRESS_SUPPORT,
    CYPRESS_CONFIG_PATH,
    CYPRESS_CONFIG_ENV_PATH,
    CYPRESS_SUPPORT_FILE_SOURCE,
    CYPRESS_SUPPORT_FILE_DESTINATION,

    CUCUMBER_PLUGIN_TEMPLATE_SOURCE,
    CUCUMBER_PLUGIN_TEMPLATE_DESTINATION,
    CUCUMBER_CONFIG_TEMPLATE_SOURCE,
    CUCUMBER_CONFIG_TEMPLATE_DESTINATION,
}
