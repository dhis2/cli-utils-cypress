const path = require('path')

module.exports.isCaptureMode = function (env) {
    return env.dhis2_api_stub_mode === 'CAPTURE'
}

module.exports.isStubMode = function (env) {
    return env.dhis2_api_stub_mode === 'STUB'
}

module.exports.isDisabledMode = function (env) {
    return !env.dhis2_api_stub_mode || env.dhis2_api_stub_mode === 'DISABLED'
}

module.exports.getFixturesDir = function ({ fixturesFolder, env }) {
    return path.join(
        fixturesFolder,
        'network',
        env.dhis2_server_minor_version.toString()
    )
}

module.exports.getDefaultStaticResources = function () {
    return [
        'systemSettings/applicationTitle',
        'me',
        'dhis-web-commons/menu/getModules.action',
        'me/dashboard',
        'userSettings',
        'staticContent/logo_banner',
    ]
}
