/**
 * @param {string} dataTestName
 * @param {string} [prefix] - Default to "dhis2-uicore"
 * @returns {string}
 */
import { getPublicValue } from './envHelpers.js'

export const dataTestNameToSelector = (dataTestName, prefix) => {
    const defaultPrefix = getPublicValue('dhis2DataTestPrefix') || ''
    // Empty string is a valid value, so check for undefined
    const actualPrefix = prefix === undefined ? defaultPrefix : prefix
    const dataTestId = actualPrefix
        ? `${actualPrefix}-${dataTestName}`
        : dataTestName

    return `[data-test="${dataTestId}"]`
}
