const inquirer = require('inquirer')
const { addToJson } = require('../../utils/fs.js')
const { copy } = require('../../utils/fs.js')
const {
    CYPRESS_CONFIG_PATH,
    CUCUMBER_PLUGIN_TEMPLATE_SOURCE,
    CUCUMBER_PLUGIN_TEMPLATE_DESTINATION,
    CUCUMBER_CONFIG_TEMPLATE_SOURCE,
    CUCUMBER_CONFIG_TEMPLATE_DESTINATION,
} = require('../../utils/paths.js')

const createCucumberConfigs = async force => {
    const prompt = inquirer.createPromptModule()

    copy(
        CUCUMBER_PLUGIN_TEMPLATE_SOURCE,
        CUCUMBER_PLUGIN_TEMPLATE_DESTINATION,
        force
    )

    copy(
        CUCUMBER_CONFIG_TEMPLATE_SOURCE,
        CUCUMBER_CONFIG_TEMPLATE_DESTINATION,
        force
    )

    const { testFiles } = await prompt([
        {
            type: 'input',
            name: 'testFiles',
            message: 'Glob pattern for the test files to run:',
            default: '**/*.feature',
        },
    ])

    addToJson(CYPRESS_CONFIG_PATH, { testFiles })
}

module.exports = { createCucumberConfigs }
