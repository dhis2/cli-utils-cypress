import {
    getApiBaseUrl,
    getFullTestName,
    splitHostAndPath,
    toJsonBlob,
    isStaticResource,
    findMatchingRequestStub,
} from './utils.js'

/**
 * @description
 * Intercepts requests on all hosts and captures them
 * @param {NetworkShimState} state
 * @returns {undefined}
 */
export default function captureRequests(state) {
    state.config.hosts.forEach(host => {
        cy.intercept(host, request => {
            request.reply(response => {
                captureRequest(state, request, response)
            })
        })
    })
}

/**
 * @description
 * Captures intercepted request
 * @param {NetworkShimState} state
 * @param {Object} A Fetch.Request instance
 * @param {Object} reponse Fetch.Response instance
 * @returns {Object} A Fetch.Response instance
 */
async function captureRequest(state, request, response) {
    const { host, path } = splitHostAndPath(request.url, state.config.hosts)
    if (!host) {
        // pass through
        return response
    }

    state.count++

    const testName = getFullTestName()
    const isStatic = isStaticResource(path, state.config)
    const existingRequestStub = findMatchingRequestStub(
        {
            path,
            method: request.method,
            testName,
            requestBody: request.body,
            isStatic,
        },
        state.requestStubs
    )
    const { size, text } = await toJsonBlob(response.body)
    const scrubbedText = removeApiEndpointFromResponseBodyBlob(text)

    if (existingRequestStub) {
        processDuplicatedRequest({
            state,
            requestStub: existingRequestStub,
            newResponseBody: scrubbedText,
            responseStatus: response.statusCode,
        })
    } else {
        state.requestStubs.push({
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

/**
 * @description
 * Processes a duplicated request to deal with non-deterministic responses, 304s or true duplicates
 * @param {NetworkShimState} state
 * @param {RequestStub} requestStub
 * @param {Object} newResponseBody The body of a Fetch.Response instance
 * @param {number} responseStatus The response status code
 * @returns {void}
 */
function processDuplicatedRequest({
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

/**
 * @description
 * Removes date fields to avoid network fixtures from changing all the time
 * @param {NetworkShimState} state
 * @param {RequestStub} requestStub
 * @param {Object} Headers A response Headers instance
 * @returns {Object} plain object without date field
 */
function clearDateFromResponseHeaders(headers) {
    const headersClone = { ...headers }
    delete headersClone.date

    return headersClone
}

/**
 * @description
 * Removes endpoint URLs from fixtures to avoid mismatches
 * @param {string} text Response body text blob
 * @param {RequestStub} requestStub
 * @param {Object} Headers A response Headers instance
 * @returns {string} Response body text blob without references to api endpoint
 */
function removeApiEndpointFromResponseBodyBlob(text) {
    const apiEndpointUrl = new RegExp(`${getApiBaseUrl()}/api`, 'gi')

    return text.replace(apiEndpointUrl, '')
}
