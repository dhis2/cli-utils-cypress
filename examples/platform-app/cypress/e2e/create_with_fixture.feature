Feature: Creating user groups with intercept and fixture

    Scenario: Creating a user - intercept fixture
        Given the user visits the app
        When the user types in the input
        And the user clicks the add button
        Then the response to the POST request should equal the fixture
