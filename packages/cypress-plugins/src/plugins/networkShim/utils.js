const path = require('path')

module.exports.isCaptureMode = function (env) {
    return env.DHIS2_API_STUB_MODE === 'CAPTURE'
}

module.exports.isStubMode = function (env) {
    return env.DHIS2_API_STUB_MODE === 'STUB'
}

module.exports.isDisabledMode = function (env) {
    return !env.DHIS2_API_STUB_MODE || env.DHIS2_API_STUB_MODE === 'DISABLED'
}

module.exports.getFixturesDir = function ({ fixturesFolder, env }) {
    return path.join(
        fixturesFolder,
        'network',
        env.DHIS2_SERVER_MINOR_VERSION.toString()
    )
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
