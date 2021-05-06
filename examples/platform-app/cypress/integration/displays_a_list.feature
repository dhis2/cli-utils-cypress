Feature: Displays a list

    Scenario: Displaying a list of user groups from the webapi
        Given the app is rendered without a cy.intercept in the test
        Then the list of usergroups matches the network fixture produced by the shim

    Scenario: Displaying a list of user groups from a custom fixture
        Given the app is rendered with a cy.intercept in the test
        Then the list of usergroups matches the fixture in the test

