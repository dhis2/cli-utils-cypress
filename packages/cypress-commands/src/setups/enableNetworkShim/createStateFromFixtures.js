import { isStubMode } from './utils'

/**
 * Configuration section of the network shim state
 * @typedef {Object} NetworkShimConfig
 * @property {number} serverMinorVersion DHIS2 Core instance server minor version, i.e. 36
 * @property {String[]} hosts List of domains to capture/stub requests for
 * @property {String[]} staticResources List of resources not specific to any test and guaranteed to
 *      always return the same response
 * @property {('CAPTURE'|'STUB'|'DISABLED')} mode Capture requests, return fixtures, or do nothing
 */

/**
 * A request stub read from a fixture
 * @typedef {Object} RequestStub
 * @property {String} path Resource URL
 * @property {String} testName Full test name, usually "<ScenarioName> -- "
 * @property {Boolean} static True if resource is in list of staticResources
 * @property {Number} count The cummulative count of the request being encountered
 * @property {Boolean} nonDeterministic A stub is classified as non-deterministic when a request is
 *      encountered with identical path, method and response body as a previous request, but with a
 *      different response body. This is a valid scenario, for example when mutating and then refetching a list
 * @property {String} method HTTP request method
 * @property {String} requestBody HTTP request body
 * @property {Object} requestHeaders HTTP request headers
 * @property {number} statusCode HTTP response status code
 * @property {String|String[]} responseBody A JSON blob or, when dealing with nonDeterministic response, an array of JSON blobs
 * @property {number} responseSize Size of response body in kb
 * @property {Object} responseHeaders HTTP response headers
 * @property {Number[]} [responseLookup] Only needed for nonDeterministic requestStub, used to return the correct response body
 */

/**
 * State used to capture and stub network requests
 * @typedef {Object} NetworkShimState
 * @property {number} count The number of the requests captured
 * @property {number} totalResponseSize The cummulative size of captured response bodies in kb
 * @property {number} duplicates The number of duplicated request during a capture run
 * @property {number} nonDeterministicResponses The cummulative number of nonDeterministic responses
 * @property {String[]} fixtureFiles List of files produced during the capture run
 * @property {RequestStub[]} requestStubs The list of request stubs, read from the fixture files
 * @property {NetworkShimConfig} config
 */

// TODO: Use these typedefs to annotate individual functions with jsDocs

export default function createStateFromFixtures({ hosts, staticResources }) {
    try {
        const serverMinorVersion = Cypress.env('dhis2_server_minor_version')
        const config = {
            serverMinorVersion,
            hosts,
            staticResources,
            mode: Cypress.env('dhis2_api_stub_mode'),
        }

        return cy
            .fixture(`${getNetworkFixturesDir()}/summary.json`)
            .then(({ fixtureFiles, ...summary }) =>
                parseFixtureFiles(fixtureFiles).then(requestStubs => ({
                    ...summary,
                    requestStubs: isStubMode()
                        ? requestStubs.map(requestStub => ({
                              ...requestStub,
                              responseCount: 0,
                          }))
                        : requestStubs,
                    config,
                }))
            )
    } catch (error) {
        console.error('NetworkShim capture mode initialzation error', error)
    }
}

function parseFixtureFiles(fileNames) {
    return cy
        .all(
            ...fileNames.map(fileName => () =>
                cy.fixture(`${getNetworkFixturesDir()}/${fileName}`)
            )
        )
        .then(requestStubs => requestStubs.flat())
}

function getNetworkFixturesDir() {
    return `network/${Cypress.env('dhis2_server_minor_version')}`
}
