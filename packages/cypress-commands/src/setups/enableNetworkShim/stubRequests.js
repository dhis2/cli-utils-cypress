import {
    splitHostAndPath,
    getFullTestName,
    findMatchingRequestStub,
    isStaticResource,
} from './utils'

/**
 * @description
 * Intercepts requests to all the configured hosts
 * @param {NetworkShimState} state
 * @returns {void}
 */
export default function stubRequests(state) {
    state.config.hosts.forEach(host => {
        const hostRegex = new RegExp(`^${host}`)

        cy.intercept(hostRegex, request => {
            stubRequest(state, request)
        })
    })
}

/**
 * @description
 * Returns the correct stubbed response for the intercepted request
 * @param {NetworkShimState} state
 * @returns {void}
 */
function stubRequest(state, request) {
    const { host, path } = splitHostAndPath(request.url, state.config.hosts)

    if (!host) {
        // Could a be configuration error
        console.error('NetworkShim encountered a request to an unknown host')
        return request
    }

    const testName = getFullTestName()
    const stubProps = {
        path,
        method: request.method,
        testName,
        requestBody: request.body,
        isStatic: isStaticResource(path, state.config),
    }
    const requestStub = findMatchingRequestStub(stubProps, state.requestStubs)

    if (!requestStub) {
        registerMissingRequestStub(state, stubProps)

        /*
         * Reply with an dummy response to avoid the request
         * from being sent to the destination server
         */
        request.reply({
            body: `Network shim did not find a recorded fixture for this request in test "${testName}"`,
            headers: {},
            statusCode: 404,
        })
    } else {
        const responseBody = getRequesStubResponseBody(requestStub)

        requestStub.responseCount++

        request.reply({
            body: responseBody,
            headers: requestStub.responseHeaders,
            statusCode: requestStub.statusCode,
        })
    }
}

function getRequesStubResponseBody({
    nonDeterministic,
    responseBody,
    responseLookup,
    responseCount,
}) {
    if (nonDeterministic) {
        const responseBodyIndex = responseLookup[responseCount]
        return JSON.parse(responseBody[responseBodyIndex])
    }

    return JSON.parse(responseBody)
}

function registerMissingRequestStub(state, { method, path, testName }) {
    /*
     * A missing requestStub could indicate there is a problem, but it
     * could also be that an in-test cy.intercept is providing a static
     * response object or fixture. Throwing an error here is problematic
     * for the latter case, because the test would fail due to the error.
     * So instead we collect missingRequestStubs on the state and let
     * the plugin warn the user about this once the full run is completed.
     */
    if (!state.missingRequestStubs) {
        state.missingRequestStubs = []
    }

    const isDuplicate = state.missingRequestStubs.some(
        stub =>
            stub.method === method &&
            stub.path === path &&
            stub.testName === testName
    )

    if (!isDuplicate) {
        state.missingRequestStubs.push({ method, path, testName })
    }
}
