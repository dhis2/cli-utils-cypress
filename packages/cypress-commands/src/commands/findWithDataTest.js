import { parseSelectorWithDataTest } from '../helper/parseSelectorWithDataTest'

/**
 * Transforms values in curly braces to a data-test selector
 *
 * @param {jQuery} subject
 * @param {string} selectors
 * @param {string} [prefix]
 * @returns {Object}
 */
export const findWithDataTest = (subject, selectors, options = {}) => {
    const { prefix, ...restOptions } = options
    const selector = parseSelectorWithDataTest(selectors, prefix)
    return cy.wrap(subject).find(selector, restOptions)
}

Cypress.Commands.add(
    'findWithDataTest',
    { prevSubject: true },
    findWithDataTest
)
