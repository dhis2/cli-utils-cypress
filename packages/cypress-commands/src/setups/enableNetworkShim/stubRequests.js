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
        const message = `No request stub found for a ${request.method} to "${path}" in test "${testName}". Perhaps you should try a capture run first?`
        throw new Error(message)
    }

    const responseBody = getRequesStubResponseBody(requestStub)

    requestStub.responseCount++

    request.reply({
        body: responseBody,
        /*
         * TODO: currently we are excluding headers from the StaticResponse object because
         * that breaks stub mode for DHIS2 platform apps. It is currently unclear if there
         * is a problem with cypress' cy.intercept behaviour of our internal implementation,
         * but we do need to address this issue, because in it's current state we will not be
         * able to write tests that assert response header properties.
         */
        // headers: requestStub.responseHeaders,
        statusCode: requestStub.statusCode,
    })
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
