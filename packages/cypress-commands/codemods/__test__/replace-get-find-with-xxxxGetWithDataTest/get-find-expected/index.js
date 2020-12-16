// should get modified
cy.getWithDataTest('{data-test-name}:first-child button')
cy.get('div').findWithDataTest('{data-test-name}:first-child button')

// should not get modified
cy.get(':first-child button')
cy.get('div').find(':first-child button')
