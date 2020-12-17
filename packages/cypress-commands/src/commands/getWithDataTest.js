import { parseSelectorWithDataTest } from '../helper/parseSelectorWithDataTest'

/**
 * Transforms values in curly braces to a data-test selector
 *
 * @param {Function} originalFn
 * @param {string} selectors
 * @param {Object} [options]
 * @param {string} [options.prefix]
 * @returns {Object}
 */
export const getWithDataTest = (selectors, options = {}) => {
    const { prefix, ...restOptions } = options
    const selector = parseSelectorWithDataTest(selectors, prefix)
    return cy.get(selector, restOptions)
}

Cypress.Commands.add('getWithDataTest', getWithDataTest)
