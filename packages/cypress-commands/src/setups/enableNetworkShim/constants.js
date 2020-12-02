export const API_STUB_MODES = {
    STUB: 'STUB',
    DISABLED: 'DISABLED',
    CAPTURE: 'CAPTURE',
}

export const FIXTURE_MODES = {
    STATIC: 'STATIC',
    DYNAMIC: 'DYNAMIC',
}

export const DEFAULT_FIXTURE_MODE = FIXTURE_MODES.DYNAMIC

export const DEFAULT_STATIC_RESOURCES = [
    'systemSettings/applicationTitle',
    'me',
    'dhis-web-commons/menu/getModules.action',
    'me/dashboard',
    'userSettings',
    'staticContent/logo_banner',
]

export const NETWORK_FIXTURES_DIR = 'cypress/fixtures/network'
