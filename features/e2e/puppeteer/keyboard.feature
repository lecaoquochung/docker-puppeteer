@sandbox @puppeteer @keyboard
Feature: Puppeteer Keyboard Shortcuts

  Scenario: Keyboard Shortcuts
    Given I open search engine "GoogleJP" url "https://google.co.jp" page
    And   I type "QA " 'textarea[name="q"]'
    
    When I press the combination keys "Control" and "A"
    Then I should see the select all

    When I press the combination keys "Control" and "C"
    Then I should be abble to copy selected text
    
    When I press the combination keys "Control" and "V"
    Then I should be abble to paste selected text

    # When I press the combination keys "Control" and "X"
    # Then I should be abble to cut selected text

    # When I press the combination keys "Control" and "Z"
    # Then I should be abble to undo

    # When I press the combination keys "Control" and "Y"
    # Then I should be abble to redo

    # When I press the combination keys "Control" and "F"
    # Then I should be abble to find

    # When I press the combination keys "Control" and "G"
    # Then I should be abble to find next

    # When I press the combination keys "Control" and "H"
    # Then I should be abble to find and replace

    # When I press the combination keys "Control" and "P"
    # Then I should be abble to print

    # When I press the combination keys "Control" and "S"
    # Then I should be abble to save

    # When I press the combination keys "Control" and "U"
    # Then I should be abble to view source