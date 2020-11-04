/**
 * @param {Object} args
 * @param {string} args.url
 * @param {string} args.fixture
 * @param {string} [args.methog] - Defaults to 'GET'
 * @returns {Cypress}
 */
export const stubWithFixture = ({ method = 'GET', url, fixture }) => {
    return cy.route({
        method,
        url,
        response: `fixture:${fixture}`,
    })
}
