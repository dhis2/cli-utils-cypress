import {
    getApiBaseUrl,
    getFullTestName,
    splitHostAndPath,
    toJsonBlob,
    isStaticResource,
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
    const isStatic = isStaticResource(path, state.config)
    const requestStub = findMatchingRequestStub(
        {
            path,
            method: request.method,
            testName,
            requestBody: request.body,
            isStatic,
        },
        state.requests
    )
    const { size, text } = await toJsonBlob(response.body)
    const scrubbedText = removeApiEndpointFromResponseBodyBlob(text)

    if (requestStub) {
        // Repeated request
        processDuplicatedRequestStub({
            state,
            requestStub,
            newResponseBody: scrubbedText,
            responseStatus: response.statusCode,
        })
    } else {
        // New request
        state.requests.push({
            path,
            testName: isStatic ? null : testName,
            static: isStatic,
            count: 1,
            nonDeterministic: false,
            method: request.method,
            requestBody: request.body,
            requestHeaders: request.headers,
            statusCode: response.statusCode,
            responseBody: scrubbedText,
            responseSize: size,
            responseHeaders: clearDateFromResponseHeaders(response.headers),
        })
        state.totalResponseSize += size
    }
    return response
}

function processDuplicatedRequestStub({
    state,
    requestStub,
    newResponseBody,
    responseStatus,
}) {
    requestStub.count += 1
    state.duplicates += 1
    const isNotModified = responseStatus === 304

    if (!requestStub.nonDeterministic) {
        // if requestStub.responseBody equals newResponseBody this is a simple
        // duplicated request and we don't take any action
        // And we deal with 304s the same way

        if (requestStub.responseBody !== newResponseBody && !isNotModified) {
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
        const matchingResponseBodyIndex = isNotModified
            ? // When isNotModified the response body is empty and the browser is expected
              // to return the last known response, so we do the same.
              requestStub.responseBody.lenght - 1
            : requestStub.responseBody.findIndex(
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

function clearDateFromResponseHeaders(headers) {
    const headersClone = { ...headers }
    delete headersClone.date

    return headersClone
}

function removeApiEndpointFromResponseBodyBlob(text) {
    const apiEndpointUrl = new RegExp(`${getApiBaseUrl()}/api`, 'gi')

    return text.replace(apiEndpointUrl, '')
}
