/**
 * @param {string} url
 * @param {Object} options
 * @returns {Cypress}
 */
export const visitWhenStubbed = (url, options = {}) => {
    return cy.visit(url, {
        ...options,
        onBeforeLoad: win => {
            delete win.fetch
            options.onBeforeLoad && options.onBeforeLoad(win)
        },
    })
}

Cypress.Commands.add('visitWhenStubbed', visitWhenStubbed)
