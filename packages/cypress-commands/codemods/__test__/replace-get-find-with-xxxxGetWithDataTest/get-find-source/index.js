// should get modified
cy.get('{data-test-name}:first-child button')
cy.get('div').find('{data-test-name}:first-child button')

// should not get modified
cy.get(':first-child button')
cy.get('div').find(':first-child button')
