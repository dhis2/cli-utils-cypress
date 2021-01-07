const path = require('path')
const { runCodemod } = require('../../utils/runCodemod.js')

module.exports.purgePluginLegacyCode = async function (paths) {
    const codemod = path.join(
        paths.CLI_TOOL_ROOT,
        'codemods',
        'purge-plugin-legacy-code.js'
    )
    const files = [paths.CYPRESS_PLUGIN_TEMPLATE_DESTINATION]

    return runCodemod(codemod, files, {})
}
