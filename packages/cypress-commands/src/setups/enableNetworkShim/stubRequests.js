import {
    splitHostAndPath,
    getFeatureName,
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
    state.config.hosts.forEach((host) => {
        const hostRegex = new RegExp(`^${host}`)

        cy.intercept(hostRegex, (request) => {
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

    const featureName = getFeatureName()
    const stubProps = {
        path,
        method: request.method,
        featureName,
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
            body: `Network shim did not find a recorded fixture for this request in test "${featureName}"`,
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
    method,
    path,
}) {
    if (nonDeterministic) {
        const responseBodyArray = responseBody
        const responseBodyIndex = responseLookup[responseCount]
        let nonDeterministicResponseBody = responseBodyArray[responseBodyIndex]

        if (!nonDeterministicResponseBody) {
            // Just get the last one
            nonDeterministicResponseBody =
                responseBodyArray[responseBodyArray.length - 1]
            // This warning will only be visible when debugging the stub run in a headed browser, but that's OK
            const uriDecodedPath = decodeURIComponent(path)
            console.warn(
                `Could not identify a response body for a non-deterministic ${method} request to "${uriDecodedPath}". Response count ${responseCount} is out of bounds of the response lookup table. Returning the last response body instead.`
            )
        }

        return JSON.parse(nonDeterministicResponseBody)
    }

    return JSON.parse(responseBody)
}

function registerMissingRequestStub(state, { method, path, featureName }) {
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
        (stub) =>
            stub.method === method &&
            stub.path === path &&
            stub.featureName === featureName
    )

    if (!isDuplicate) {
        state.missingRequestStubs.push({ method, path, featureName })
    }
}
