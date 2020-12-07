import {
    API_STUB_MODES,
    FIXTURE_MODES,
    DEFAULT_FIXTURE_MODE,
    DEFAULT_STATIC_RESOURCES,
    NETWORK_FIXTURES_DIR,
} from './constants.js'

export const getApiBaseUrl = () => {
    const baseUrl = Cypress.env('dhis2_base_url')

    if (!baseUrl) {
        throw new Error(
            'No `dhis2_base_url` found. Please make sure to add it to `cypress.env.json`'
        )
    }

    return baseUrl
}

export const getDefaultHosts = () => [getApiBaseUrl()]

export const isDisabledMode = () =>
    !Cypress.env('dhis2_api_stub_mode') ||
    Cypress.env('dhis2_api_stub_mode') === API_STUB_MODES.DISABLED

export const isCaptureMode = () =>
    Cypress.env('dhis2_api_stub_mode') === API_STUB_MODES.CAPTURE

export const isStubMode = () =>
    Cypress.env('dhis2_api_stub_mode') === API_STUB_MODES.STUB

export const getDefaultFixtureMode = () => DEFAULT_FIXTURE_MODE

export const getDefaultStaticResources = () => DEFAULT_STATIC_RESOURCES

export const isStaticResource = (path, staticResources) => {
    const cleanedPath = path.split('?')[0]
    return staticResources.some(resourcePath =>
        cleanedPath.endsWith(resourcePath)
    )
}

export const splitHostAndPath = (url, hosts) => {
    const host = hosts.find(host => url.indexOf(host) === 0)
    const path = url.substr(host.length)

    return { host, path }
}

const extractTitles = (obj, titles) => {
    if (obj && 'parent' in obj) {
        titles.push(obj.title)
        return extractTitles(obj.parent, titles)
    }

    return titles
}

export const getFullTestName = () => {
    return extractTitles(Cypress.mocha.getRunner().suite.ctx.test, [])
        .reverse()
        .join(' -- ')
}

export const toJsonBlob = async input => {
    const responseBodyStr = JSON.stringify(input)
    const blob = new Blob([responseBodyStr], { type: 'application/json' })
    const size = blob.size
    const text = await blob.text()

    return { size, text }
}

export const isPathStaticResource = (path, config) =>
    config.fixtureMode === FIXTURE_MODES.STATIC ||
    isStaticResource(path, config.staticResources)

export const findMatchingRequestStub = (
    { path, method, testName, requestBody, isStaticResource },
    requests
) =>
    requests.find(r => {
        const isMatchingRequest =
            path === r.path &&
            method === r.method &&
            (requestBody === r.requestBody ||
                JSON.stringify(requestBody) === JSON.stringify(r.requestBody))

        return isStaticResource
            ? isMatchingRequest
            : isMatchingRequest && testName === r.testName
    })

export const getNetworkFixturesDir = () =>
    `${NETWORK_FIXTURES_DIR}/${Cypress.env('dhis2_server_minor_version')}`
