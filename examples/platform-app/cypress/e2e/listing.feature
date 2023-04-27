Feature: The app lists user groups

    Scenario: The app displays user groups from the database
        Given the user visits the app
        Then the app shows a list of user groups from the database

    Scenario: The app displays user groups from a static response
        Given a static response object is declared
        And the user visits the app
        Then the app shows a list of user groups based on the static response