import {
    splitHostAndPath,
    getFullTestName,
    findMatchingRequestStub,
    isStaticResource,
} from './utils'

export default function stubRequests(state) {
    state.config.hosts.forEach(host => {
        cy.intercept(host, request => {
            stubRequest(state, request)
        })
    })
}

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
        headers: requestStub.responseHeaders,
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
