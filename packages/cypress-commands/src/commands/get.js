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
export const get = (originalFn, selectors, options = {}) => {
    const { prefix, ...restOptions } = options
    const selector = parseSelectorWithDataTest(selectors, prefix)
    return originalFn(selector, restOptions)
}
