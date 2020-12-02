import {
    getFullTestName,
    splitHostAndPath,
    toJsonBlob,
    isPathStaticResource,
    findMatchingRequestStub,
} from './utils.js'

export default function captureRequests(state) {
    state.config.hosts.forEach(host => {
        cy.intercept(host, request => {
            request.reply(response => {
                try {
                    captureRequest(state, request, response)
                } catch (error) {
                    console.error('NetworkShim capture error', error)
                }
            })
        })
    })
}

async function captureRequest(state, request, response) {
    const { host, path } = splitHostAndPath(request.url, state.config.hosts)
    if (!host) {
        // pass through
        return response
    }

    state.count++

    const testName = getFullTestName()
    const isStaticResource = isPathStaticResource(path, state.config)
    const requestStub = findMatchingRequestStub(
        {
            path,
            method: request.method,
            testName,
            requestBody: request.body,
            isStaticResource,
        },
        state.requests
    )
    const { size, text } = await toJsonBlob(response.body)

    if (requestStub) {
        // Repeated request
        processDuplicatedRequestStub(state, requestStub, text)
    } else {
        // New request
        state.requests.push({
            path,
            testName: isStaticResource ? null : testName,
            static: isStaticResource,
            count: 1,
            nonDeterministic: false,
            method: request.method,
            requestBody: request.body,
            requestHeaders: request.headers,
            statusCode: response.statusCode,
            responseBody: text,
            responseSize: size,
            responseHeaders: response.headers,
        })
        state.totalResponseSize += size
    }
    return response
}

function processDuplicatedRequestStub(state, requestStub, newResponseBody) {
    requestStub.count += 1
    state.duplicates += 1

    if (!requestStub.nonDeterministic) {
        // if requestStub.responseBody equals newResponseBody this is a simple
        // duplicated requestStub and we don't take any action

        if (requestStub.responseBody !== newResponseBody) {
            // Switch to nonDeterministic requestStub mode with responseBody array
            state.nonDeterministicResponses += 1
            requestStub.nonDeterministic = true
            requestStub.responseBody = [
                requestStub.responseBody,
                newResponseBody,
            ]
            requestStub.responseLookup = [0, 1]
        }
    } else {
        // RequestStub was already nonDeterministic, responseBody is already an array
        const matchingResponseBodyIndex = requestStub.responseBody.findIndex(
            responseBody => responseBody === newResponseBody
        )

        if (matchingResponseBodyIndex >= 0) {
            // No need to store the responseBody, we already have it
            requestStub.responseLookup.push(matchingResponseBodyIndex)
        } else {
            // Add a new responseBody
            state.nonDeterministicResponses += 1
            requestStub.responseBody.push(newResponseBody)
            requestStub.responseLookup.push(requestStub.responseBody.length - 1)
        }
    }
}
