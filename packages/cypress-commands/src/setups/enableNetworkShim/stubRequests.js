import {
    splitHostAndPath,
    getFullTestName,
    findMatchingRequestStub,
    isPathStaticResource,
} from './utils'

export default function stubRequests(state) {
    state.config.hosts.forEach(host => {
        cy.intercept(host, request => {
            try {
                stubRequest(state, request)
            } catch (error) {
                console.error('NetworkShim stub error', error)
            }
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

    const stubProps = {
        path,
        method: request.method,
        testName: getFullTestName(),
        requestBody: request.body,
        isStaticResource: isPathStaticResource(path, state.config),
    }
    const requestStub = findMatchingRequestStub(stubProps, state.requests)
    const responseBody = getRequesStubResponseBody(requestStub)

    requestStub.stubResponseCount++

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
    stubResponseCount,
}) {
    if (nonDeterministic) {
        const responseBodyIndex = responseLookup[stubResponseCount]
        return JSON.parse(responseBody[responseBodyIndex])
    }

    return JSON.parse(responseBody)
}
