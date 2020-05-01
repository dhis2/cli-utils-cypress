const path = require('path')
const { CONSUMING_ROOT, CYPRESS_PLUGINS } = require('../../utils/paths.js')
const { copy } = require('../../utils/fs.js')

const TEMPLATE_PATH = path.join(__dirname, '../../../templates')

const PLUGIN_TEMPLATE_SOURCE = path.join(TEMPLATE_PATH, 'plugins.js')
const PLUGIN_TEMPLATE_DESTINATION = path.join(CYPRESS_PLUGINS, 'index.js')

const CONFIG_TEMPLATE_SOURCE = path.join(TEMPLATE_PATH, 'plugins.js')
const CONFIG_TEMPLATE_DESTINATION = path.join(
    CONSUMING_ROOT,
    'cypress-cucumber-preprocessor.config.js'
)

const createCucumberConfigs = force => {
    copy(PLUGIN_TEMPLATE_SOURCE, PLUGIN_TEMPLATE_DESTINATION, force)
    copy(CONFIG_TEMPLATE_SOURCE, CONFIG_TEMPLATE_DESTINATION, force)
}

module.exports = { createCucumberConfigs }
