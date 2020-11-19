/**
 * @param {Object} args
 * @param {string} args.methog
 * @param {string} args.url
 * @param {string} args.fixture
 * @returns {Cypress}
 */
export const stubWithFixture = ({ method = 'GET', url, fixture }) => {
    return cy.route({
        method,
        url,
        response: `fixture:${fixture}`,
    })
}

Cypress.Commands.add('stubWithFixture', stubWithFixture)
