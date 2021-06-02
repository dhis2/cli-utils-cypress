/**
 * @param {string} dataTestName
 * @param {string} [prefix] - Default to "dhis2-uicore"
 * @returns {string}
 */
const dataTestNameToSelector = (dataTestName, prefix) => {
    const defaultPrefix = Cypress.env('dhis2DataTestPrefix') || ''
    // Empty string is a valid value, so check for undefined
    const actualPrefix = typeof prefix === 'undefined' ? defaultPrefix : prefix
    const dataTestId = actualPrefix
        ? `${actualPrefix}-${dataTestName}`
        : dataTestName

    return `[data-test="${dataTestId}"]`
}

module.exports = dataTestNameToSelector
