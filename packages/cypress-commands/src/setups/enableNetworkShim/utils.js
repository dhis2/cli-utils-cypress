export const isStaticResource = (path, { staticResources }) => {
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

export const getFeatureName = () => {
    let obj = Cypress.mocha.getRunner().suite.ctx.test
    let title = null
    while (obj && obj.parent && obj.parent.title) {
        obj = obj.parent
        title = obj.title
    }
    return title
}

export const toJsonBlob = async input => {
    const responseBodyStr = JSON.stringify(input)
    const blob = new Blob([responseBodyStr], { type: 'application/json' })
    const size = blob.size
    const text = await blob.text()

    return { size, text }
}

const isNameMatch = (featureName, requestStub) => {
    /**
     * Up until v8.0.1 a network fixture would contain a `testName`
     * which was a combination of a feature-name and a scenario-name.
     * In PR #261 this behaviour was altered because of a bug reg.
     * 304 requests. In PR #261 `testName` was replaced by `featureName`,
     * which only contains the name of the feature. To prevent PR #261
     * resulting in a breaking change we include an additional check,
     * so that old fixture files using the `testName` property are still
     * handled properly. This check for `testName` can be removed in v9.
     */
    if (requestStub.testName) {
        return requestStub.testName.includes(featureName)
    }

    return featureName === requestStub.featureName
}

export const findMatchingRequestStub = (
    { path, method, featureName, requestBody, isStatic },
    requestStubs
) =>
    requestStubs.find(requestStub => {
        const isMatchingRequest =
            path === requestStub.path &&
            method === requestStub.method &&
            (requestBody === requestStub.requestBody ||
                JSON.stringify(requestBody) ===
                    JSON.stringify(requestStub.requestBody))

        return isStatic
            ? isMatchingRequest
            : isMatchingRequest && isNameMatch(featureName, requestStub)
    })
