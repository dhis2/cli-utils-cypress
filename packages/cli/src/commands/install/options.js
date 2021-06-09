const { enableAutoLogin } = require('./enableAutoLogin.js')
const { enableNetworkShim } = require('./enableNetworkShim.js')
const { registerCommands } = require('./registerCommands.js')
const { setBaseUrl } = require('./setBaseUrl.js')
const { setDataTestPrefix } = require('./setDataTestPrefix.js')
const { setLoginBackendUrl } = require('./setLoginBackendUrl.js')
const { setLoginPassword } = require('./setLoginPassword.js')
const { setLoginUser } = require('./setLoginUser.js')
const {
    setNonGlobalStepDefinitions,
} = require('./setNonGlobalStepDefinitions.js')
const { setProjectId } = require('./setProjectId.js')
const { setRecordVideo } = require('./setRecordVideo.js')
const {
    setTestFilesToFeatureFiles,
} = require('./setTestFilesToFeatureFiles.js')
const {
    usePluginChromeAllowXSiteCookies,
} = require('./usePluginChromeAllowXSiteCookies.js')
const {
    usePluginCucumberPreprocessor,
} = require('./usePluginCucumberPreprocessor.js')

const groups = {
    CYPRESS_CONFIG: 'cypress-config',
    LOGIN: 'login',
    CUCUMBER: 'cucumber',
    SUPPORT: 'support',
    NETWORK_SHIM: 'network-shim',
}

const options = [
    {
        name: 'setBaseUrl',
        group: groups.CYPRESS_CONFIG,
        handler: setBaseUrl,
    },
    {
        name: 'setRecordVideo',
        group: groups.CYPRESS_CONFIG,
        handler: setRecordVideo,
    },
    {
        name: 'setProjectId',
        group: groups.CYPRESS_CONFIG,
        handler: setProjectId,
    },
    {
        name: 'setLoginUser',
        group: groups.LOGIN,
        handler: setLoginUser,
    },
    {
        name: 'setLoginPassword',
        group: groups.LOGIN,
        handler: setLoginPassword,
    },
    {
        name: 'setLoginBackendUrl',
        group: groups.LOGIN,
        handler: setLoginBackendUrl,
    },
    {
        name: 'enableAutoLogin',
        group: groups.LOGIN,
        handler: enableAutoLogin,
    },
    {
        name: 'registerCommands',
        group: groups.SUPPORT,
        handler: registerCommands,
    },
    {
        name: 'setDataTestPrefix',
        group: groups.SUPPORT,
        handler: setDataTestPrefix,
    },
    {
        name: 'enableNetworkShim',
        group: groups.NETWORK_SHIM,
        handler: enableNetworkShim,
    },
    {
        name: 'usePluginChromeAllowXSiteCookies',
        group: groups.CUCUMBER,
        handler: usePluginChromeAllowXSiteCookies,
    },
    {
        name: 'usePluginCucumberPreprocessor',
        group: groups.CUCUMBER,
        handler: usePluginCucumberPreprocessor,
    },
    {
        name: 'setTestFilesToFeatureFiles',
        group: groups.CUCUMBER,
        handler: setTestFilesToFeatureFiles,
    },
    {
        name: 'setNonGlobalStepDefinitions',
        group: groups.CUCUMBER,
        handler: setNonGlobalStepDefinitions,
    },
]

module.exports.options = options
module.exports.groups = groups
