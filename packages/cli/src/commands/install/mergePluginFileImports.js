const path = require('path')
const { runCodemod } = require('../../utils/runCodemod.js')

/**
 * Copied from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
const onlyUnique = ({ name }, index, self) =>
    self.findIndex(curValue => curValue.name === name) === index

module.exports.mergePluginFileImports = (plugins, paths) => {
    const uniquePlugins = plugins.filter(onlyUnique)

    const codemod = path.join(
        paths.CLI_TOOL_ROOT,
        'codemods',
        'add-require-statement.js'
    )
    const files = [paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION]
    const options = {
        plugins: uniquePlugins,
        packageName: '@dhis2/cypress-plugins',
    }

    return runCodemod(codemod, files, options)
}
