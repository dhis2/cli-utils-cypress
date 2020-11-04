@foo @common
Feature: Just a test feature

    @bar
    Scenario: test 1 - First test scenario
        Given the user opens the app
        Then the login form should be visible

    @baz @common2
    Scenario: test 1 - Second test scenario
        Given the user opens the app
        Then the login form should display a server input
