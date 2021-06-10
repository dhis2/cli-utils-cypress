const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')
const rimraf = require('rimraf')
const { isCaptureMode, isStubMode, getFixturesDir } = require('./utils.js')

/**
 * Configuration section of the network shim state
 * @typedef {Object} NetworkShimConfig
 * @property {number} apiVersion DHIS2 Core instance server minor version, i.e. 36
 * @property {String[]} hosts List of domains to capture/stub requests for
 * @property {String[]} staticResources List of resources not specific to any test and guaranteed to
 *      always return the same response
 * @property {('capture'|'stub'|'live')} mode Capture requests, return fixtures, or do nothing
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
 * @property {String|String[]} responseBody A JSON blob or, when dealing with nonDeterministic response,
 *      an array of JSON blobs
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

/**
 * @description
 * Reads JSON network fixtures files and returns state
 * @param {Object} cypressConfig Cypress configuration
 * @param {String[]} hosts Hosts to capture and stub for
 * @param {String[]} staticResources Resource to treat as static (always returning the same response)
 * @returns {NetworkShimState}
 */
module.exports = function createState(cypressConfig, hosts, staticResources) {
    try {
        const env = cypressConfig.env
        const apiVersion = env.dhis2ApiVersion
        const fixturesDir = getFixturesDir(cypressConfig)
        const config = {
            apiVersion,
            mode: env.networkMode,
            hosts: hosts || [env.dhis2BaseUrl],
            staticResources,
        }

        if (isCaptureMode(env)) {
            clearFixturesDir(fixturesDir, apiVersion)
            return createInitialState(config)
        } else if (isStubMode(env)) {
            return createStateFromFixtures(config, fixturesDir)
        }
    } catch (error) {
        throw new Error(
            `Encountered an error creating the NetworkShim state: ${error.message}`
        )
    }
}

function clearFixturesDir(fixtureDir, apiVersion) {
    try {
        if (fs.existsSync(fixtureDir)) {
            rimraf.sync(fixtureDir)
        }
        fs.ensureDirSync(fixtureDir)

        log.info(`Cleared network fixture directory for version: ${apiVersion}`)
    } catch (error) {
        throw new Error(
            `Encountered an error clearing the network fixtures directory: ${error.message}`
        )
    }
}

function createInitialState(config) {
    return {
        count: 0,
        totalResponseSize: 0,
        duplicates: 0,
        nonDeterministicResponses: 0,
        fixtureFiles: [],
        requestStubs: [],
        config,
    }
}

function createStateFromFixtures(config, fixturesDir) {
    const { fixtureFiles, ...summary } = readJsonFileSync(
        path.join(fixturesDir, 'summary.json')
    )
    const requestStubs = fixtureFiles
        .map(fileName => readJsonFileSync(path.join(fixturesDir, fileName)))
        .flat()
        .map(requestStub => ({
            ...requestStub,
            responseCount: 0,
        }))

    return {
        ...summary,
        requestStubs,
        config,
    }
}

function readJsonFileSync(path) {
    return JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }))
}
