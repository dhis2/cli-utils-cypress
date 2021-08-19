Feature: Handles 304s in a single feature

    Scenario: The app displays user groups from the database
        Given the user visits the app
        Then the app shows a list of user groups from the database

    Scenario: The app displays user groups from the database AGAIN
        Given the user visits the app
        Then the app shows a list of user groups from the database