const { runCodemod } = require('../../utils/runCodemod.js')
const path = require('path')

/**
 * Copied from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
const onlyUnique = (value, index, self) => self.indexOf(value) === index

module.exports.mergePluginSetupCalls = (plugins, paths) => {
    const pluginInits = plugins.filter(onlyUnique)

    const codemod = path.join(paths.CLI_TOOL_ROOT, 'codemods', 'add-plugin.js')
    const files = [paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION]
    const options = { pluginInits }

    return runCodemod(codemod, files, options)
}
