@navigation
Feature: Navigation

  Scenario: Open website, login, and place an order
    Given I open the website "https://hmushop.top/index/user/login.html"
    When I login with username "cobethanhdat1" and password "cobe102"
    Then I should see the menu
    Then I click on order
    Then I click submit