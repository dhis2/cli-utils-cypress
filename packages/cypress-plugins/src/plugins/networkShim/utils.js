const path = require('path')

module.exports.isCaptureMode = function (env) {
    return env.networkMode === 'capture'
}

module.exports.isStubMode = function (env) {
    return env.networkMode === 'stub'
}

module.exports.isLiveMode = function (env) {
    return !env.networkMode || env.networkMode === 'live'
}

module.exports.getFixturesDir = function ({ fixturesFolder, env }) {
    return path.join(fixturesFolder, 'network', env.dhis2ApiVersion.toString())
}

module.exports.getDefaultStaticResources = function () {
    return [
        'system/info',
        'systemSettings/applicationTitle',
        'me',
        'dhis-web-commons/menu/getModules.action',
        'me/dashboard',
        'userSettings',
        'staticContent/logo_banner',
    ]
}
