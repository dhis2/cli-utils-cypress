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

export const isMatchingRequest = ({ path, method, requestBody }, requestStub) =>
    path === requestStub.path &&
    method === requestStub.method &&
    (requestBody === requestStub.requestBody ||
        JSON.stringify(requestBody) === JSON.stringify(requestStub.requestBody))

export const findMatchingRequestStub = (
    { testName, isStatic, ...requestProps },
    requestStubs
) =>
    requestStubs.find(requestStub =>
        isStatic
            ? isMatchingRequest(requestProps, requestStub)
            : testName === requestStub.testName &&
              isMatchingRequest(requestProps, requestStub)
    )
