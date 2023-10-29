@selenium
Feature: Searching for Cheese on Google

  Scenario: Finding some cheese with Selenium
    Given I am on the Google search page
    When I search for "Cheese!"
    Then the page title should start with "cheese"