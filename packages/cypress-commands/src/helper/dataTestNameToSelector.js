/**
 * @param {string} dataTestName
 * @param {string} [prefix] - Default to "dhis2-uicore"
 * @returns {string}
 */
export const dataTestNameToSelector = (dataTestName, prefix) => {
    const defaultPrefix = Cypress.env('DHIS2_DATATEST_PREFIX') || ''
    // Empty string is a valid value, so check for undefined
    const actualPrefix = typeof prefix === 'undefined' ? defaultPrefix : prefix
    const dataTestId = actualPrefix
        ? `${actualPrefix}-${dataTestName}`
        : dataTestName

    return `[data-test="${dataTestId}"]`
}
