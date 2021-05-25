Feature: The creating user groups with intercept and static response

    Scenario: Creating a user - intercept static response
        Given the user visits the app
        When the user types in the input
        And the user clicks the add button
        Then the response to the POST request should equal the static response
