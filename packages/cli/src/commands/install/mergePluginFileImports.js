const { runCodemod } = require('../../utils/runCodemod.js')
const path = require('path')

/**
 * Copied from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
const onlyUnique = (value, index, self) => self.indexOf(value) === index

module.exports.mergePluginFileImports = (plugins, paths) => {
    const importNames = plugins.filter(onlyUnique)

    const codemod = path.join(
        paths.CLI_TOOL_ROOT,
        'codemods',
        'add-require-statement.js'
    )
    const files = [paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION]
    const options = { importNames, packageName: '@dhis2/cypress-plugins' }

    return runCodemod(codemod, files, options)
}
