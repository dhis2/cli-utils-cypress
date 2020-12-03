const path = require('path')

module.exports.makePaths = cwd => {
    const CLI_TOOL_ROOT = path.join(__dirname, '..', '..')
    const PACKAGE_JSON = path.join(cwd, 'package.json')
    const YARN_LOCK = path.join(cwd, 'yarn.lock')
    const PACKAGE_JSON_LOCK = path.join(cwd, 'package-lock.json')

    const TEMPLATES = path.join(CLI_TOOL_ROOT, 'templates')

    // cypress folders
    const CYPRESS_ROOT = path.join(cwd, 'cypress')
    const CYPRESS_FIXTURES = path.join(CYPRESS_ROOT, 'fixtures')
    const CYPRESS_INTEGRATION = path.join(CYPRESS_ROOT, 'integration')
    const CYPRESS_PLUGINS = path.join(CYPRESS_ROOT, 'plugins')
    const CYPRESS_SUPPORT = path.join(CYPRESS_ROOT, 'support')

    // cypress.json
    const CYPRESS_JSON_SOURCE = path.join(TEMPLATES, 'cypress.json')
    const CYPRESS_JSON_DESTINATION = path.join(cwd, 'cypress.json')

    // cypress.env.json
    const CYPRESS_ENV_JSON_SOURCE = path.join(TEMPLATES, 'cypress.env.json')
    const CYPRESS_ENV_JSON_DESTINATION = path.join(cwd, 'cypress.env.json')

    // .cypress-cucumber-preprocessorrc.json
    const CYPRESS_CUCUMBER_PREPROCESSOR_JSON_SOURCE = path.join(
        TEMPLATES,
        '.cypress-cucumber-preprocessorrc.json'
    )
    const CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION = path.join(
        cwd,
        '.cypress-cucumber-preprocessorrc.json'
    )

    // support file
    const CYPRESS_SUPPORT_FILE_SOURCE = path.join(TEMPLATES, 'support.js')
    const CYPRESS_SUPPORT_FILE_DESTINATION = path.join(
        CYPRESS_SUPPORT,
        'index.js'
    )

    // plugins file
    const CYPRESS_PLUGIN_TEMPLATE_SOURCE = path.join(TEMPLATES, 'plugins.js')
    const CYPRESS_PLUGIN_TEMPLATE_DESTINATION = path.join(
        CYPRESS_PLUGINS,
        'index.js'
    )

    return {
        cwd,
        CLI_TOOL_ROOT,
        PACKAGE_JSON,
        YARN_LOCK,
        PACKAGE_JSON_LOCK,
        TEMPLATES,
        CYPRESS_ROOT,
        CYPRESS_FIXTURES,
        CYPRESS_INTEGRATION,
        CYPRESS_PLUGINS,
        CYPRESS_SUPPORT,
        CYPRESS_JSON_SOURCE,
        CYPRESS_JSON_DESTINATION,
        CYPRESS_ENV_JSON_SOURCE,
        CYPRESS_ENV_JSON_DESTINATION,
        CYPRESS_CUCUMBER_PREPROCESSOR_JSON_SOURCE,
        CYPRESS_CUCUMBER_PREPROCESSOR_JSON_DESTINATION,
        CYPRESS_SUPPORT_FILE_SOURCE,
        CYPRESS_SUPPORT_FILE_DESTINATION,
        CYPRESS_PLUGIN_TEMPLATE_SOURCE,
        CYPRESS_PLUGIN_TEMPLATE_DESTINATION,
    }
}
