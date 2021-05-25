Feature: The creating user groups with intercept

    Scenario: Creating a user - intercept alias
        Given the user visits the app
        When the user types in the input
        And the user clicks the add button
        Then the response to the POST request has status OK
