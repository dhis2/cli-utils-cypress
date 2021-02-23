const path = require('path')
const { runCodemod } = require('../../utils/runCodemod.js')

/**
 * Copied from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
const onlyUnique = (value, index, self) => self.indexOf(value) === index

module.exports.mergeSupportFileImports = (support, paths) => {
    const importNames = support.filter(onlyUnique)

    const codemod = path.join(
        paths.CLI_TOOL_ROOT,
        'codemods',
        'add-import-statement.js'
    )
    const files = [paths.CYPRESS_SUPPORT_FILE_DESTINATION]
    const options = { importNames, packageName: '@dhis2/cypress-commands' }

    return runCodemod(codemod, files, options)
}
