@selenium
Feature: Searching for Cheese on Google

  Scenario: Finding some cheese with Selenium
    """
      Documentation
      https://cucumber.io/docs/guides/browser-automation/?lang=javascript
    """
    Given I am on the Google search page
    When I search for "Cheese!"
    Then the page title should start with "cheese"