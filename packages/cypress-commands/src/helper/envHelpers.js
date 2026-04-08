/**
 * Read a public (non-sensitive) config value.
 * Uses Cypress.expose() as sole source on 15.10+ (even if the value is undefined).
 * Falls back to Cypress.env() only when Cypress.expose is not available.
 * @param {string} key
 * @returns {*}
 */
export const getPublicValue = (key) => {
    if (typeof Cypress.expose === 'function') {
        return Cypress.expose(key)
    }
    return Cypress.env(key)
}

/**
 * Write a public (non-sensitive) config value for the current spec.
 * Uses Cypress.expose() on 15.10+, falls back to Cypress.env().
 * @param {string} key
 * @param {*} value
 */
export const setPublicValue = (key, value) => {
    if (typeof Cypress.expose === 'function') {
        Cypress.expose(key, value)
    } else {
        Cypress.env(key, value)
    }
}

/**
 * Read sensitive values (e.g. credentials).
 * Uses cy.env() on 15.10+, falls back to Cypress.env() wrapped in cy.wrap().
 * Always returns a Cypress chainable yielding { key1: val1, key2: val2 }.
 * @param {string[]} keys
 * @returns {Cypress.Chainable<Record<string, *>>}
 */
export const getSensitiveValues = (keys) => {
    if (typeof Cypress.expose === 'function') {
        return cy.env(keys)
    }
    const result = {}
    keys.forEach((key) => {
        result[key] = Cypress.env(key)
    })
    return cy.wrap(result, { log: false })
}
