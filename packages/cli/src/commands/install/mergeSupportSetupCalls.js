const path = require('path')
const { runCodemod } = require('../../utils/runCodemod.js')

const identity = arg => arg

/**
 * Copied from: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 */
const onlyUnique = (value, index, self) => self.indexOf(value) === index

module.exports.mergeSupportSetupCalls = (support, paths) => {
    const setupInits = support.filter(identity).filter(onlyUnique)

    const codemod = path.join(
        paths.CLI_TOOL_ROOT,
        'codemods',
        'add-support-setup.js'
    )
    const files = [paths.CYPRESS_SUPPORT_FILE_DESTINATION]
    const options = { setupInits }

    return runCodemod(codemod, files, options)
}
