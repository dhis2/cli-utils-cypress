const {
    ensureCypressCucumberPreprocessorJson,
} = require('./ensureCypressCucumberPreprocessorJson.js')
const { ensureCypressEnvJson } = require('./ensureCypressEnvJson.js')
const { ensureCypressJson } = require('./ensureCypressJson.js')
const { ensureDependency } = require('./ensureDependency.js')
const { ensureDirectories } = require('./ensureDirectories.js')
const { ensurePluginsFile } = require('./ensurePluginsFile.js')
const { ensureSupportFile } = require('./ensureSupportFile.js')
const {
    mergeCypressCucumberPreprocessorJson,
} = require('./mergeCypressCucumberPreprocessorJson.js')
const {
    mergeCypressEnvJsonContents,
} = require('./mergeCypressEnvJsonContents.js')
const { mergeCypressJsonContents } = require('./mergeCypressJsonContents.js')
const { mergePluginFileImports } = require('./mergePluginFileImports.js')
const { mergePluginSetupCalls } = require('./mergePluginSetupCalls.js')
const { mergeSupportFileImports } = require('./mergeSupportFileImports.js')
const { mergeSupportSetupCalls } = require('./mergeSupportSetupCalls.js')
const { purgePluginLegacyCode } = require('./purgePluginLegacyCode.js')

module.exports.applyState = async ({ state, packageManager, paths }) => {
    ensureDirectories(paths)
    ensurePluginsFile(paths)
    ensureSupportFile(paths)
    ensureCypressJson(paths)

    if (state.plugins.length) {
        await ensureDependency('@dhis2/cypress-plugins', packageManager, paths)
        await purgePluginLegacyCode(paths)
        await mergePluginFileImports(state.plugins, paths)
        await mergePluginSetupCalls(state.plugins, paths)
    }

    if (state.support.length) {
        await ensureDependency('@dhis2/cypress-commands', packageManager, paths)
        await mergeSupportFileImports(state.support, paths)
        await mergeSupportSetupCalls(state.support, paths)
    }

    if (Object.values(state.cypressJson).length) {
        mergeCypressJsonContents(state.cypressJson, paths)
    }

    if (Object.values(state.cypressEnvJson).length) {
        ensureCypressEnvJson(paths)
        mergeCypressEnvJsonContents(state.cypressEnvJson, paths)
    }

    if (Object.values(state.cypressCucumberPreprocessorJson).length) {
        ensureCypressCucumberPreprocessorJson(paths)
        mergeCypressCucumberPreprocessorJson(
            state.cypressCucumberPreprocessorJson,
            paths
        )
    }
}
