const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../replace-get-find-with-xxxxGetWithDataTest.js')
const transformOptions = {}

defineInlineTest(
    transform,
    transformOptions,
    // input
    `
// should get modified
cy.get('{data-test-name}:first-child button')
cy.get('div').find('{data-test-name}:first-child button')

// should not get modified
cy.get(':first-child button')
cy.get('div').find(':first-child button')
`,
    // output
    `
// should get modified
cy.getWithDataTest('{data-test-name}:first-child button')
cy.get('div').findWithDataTest('{data-test-name}:first-child button')

// should not get modified
cy.get(':first-child button')
cy.get('div').find(':first-child button')
`,
    'should transform all "get"/"find" that contain the custom data test selector syntax'
)
