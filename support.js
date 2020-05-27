/**
 * @param {string} dataTestName
 * @param {string} [prefix] - Default to "dhis2-uicore"
 * @returns {string}
 */
const dataTestNameToSelector = (dataTestName, prefix) => {
    const defaultPrefix = Cypress.env('dhis2_datatest_prefix') || ''
    // Empty string is a valid value, so check for undefined
    const actualPrefix = typeof prefix === 'undefined' ? defaultPrefix : prefix
    const dataTestId = actualPrefix
        ? `${actualPrefix}-${dataTestName}`
        : dataTestName

    return `[data-test="${dataTestId}"]`
}

const parseSelectorWithDataTest = (selector, prefix) => {
    return selector.replace(/\{([^}]*)\}/g, (match, dataTestName) =>
        dataTestNameToSelector(dataTestName, prefix)
    )
}

/**
 * Transforms values in curly braces to a data-test selector
 *
 * @param {jQuery} subject
 * @param {string} selectors
 * @param {string} [prefix]
 * @returns {Object}
 */
/* eslint-disable-next-line max-params */
const find = (originalFn, subject, selectors, options = {}) => {
    const { prefix, ...restOptions } = options
    const selector = parseSelectorWithDataTest(selectors, prefix)
    return originalFn(subject, selector, restOptions)
}

/**
 * Transforms values in curly braces to a data-test selector
 *
 * @param {Function} originalFn
 * @param {string} selectors
 * @param {Object} [options]
 * @param {string} [options.prefix]
 * @returns {Object}
 */
const get = (originalFn, selectors, options = {}) => {
    const { prefix, ...restOptions } = options
    const selector = parseSelectorWithDataTest(selectors, prefix)
    return originalFn(selector, restOptions)
}

/**
 * This is done through cy.request(...)
 * because Cypress doesn't allow multiple domains per test:
 * https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test
 */
const loginEndPoint = 'dhis-web-commons/security/login.action'
const login = () => {
    const username = Cypress.env('dhis2_username')
    const password = Cypress.env('dhis2_password')
    const loginUrl = Cypress.env('dhis2_base_url')
    const loginAuth = `Basic ${btoa(`${username}:${password}`)}`

    return cy.request({
        url: `${loginUrl}/${loginEndPoint}`,
        method: 'POST',
        body: {
            j_username: username,
            j_password: password,
            '2fa_code': '',
        },
        headers: { Authorization: loginAuth },
    })
}

const stubWithFixture = ({ method = 'GET', url, fixture }) => {
    return cy.route({
        method,
        url,
        response: `fixture:${fixture}`,
    })
}

/**
 * @param {string} url
 * @param {Object} options
 * @returns {Cypress}
 */
const visitWhenStubbed = (url, options = {}) => {
    return cy.visit(url, {
        ...options,
        onBeforeLoad: win => {
            delete win.fetch
            options.onBeforeLoad && options.onBeforeLoad(win)
        },
    })
}

Cypress.Commands.overwrite('find', find)
Cypress.Commands.overwrite('get', get)
Cypress.Commands.add('login', login)
Cypress.Commands.add('stubWithFixture', stubWithFixture)
Cypress.Commands.add('visitWhenStubbed', visitWhenStubbed)
