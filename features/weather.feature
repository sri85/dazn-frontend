Feature: Weather Checker App
  As an avid adventurer and backpacker
  I am interested to know the weather

  Background:
    Given I am on Weather Checker App

  Scenario: Verify elements in weather page
    Then I should see the following elements
      """
      header
      search box
      search button
      """

  Scenario Outline: Weather app should be display error message when an invalid postcode is entered
    When I search for <postcode>
    Then I should see error message "Invalid postcode."
    Examples:
      | postcode  |
      | "invalid" |
      | "EC1A1BB" |

  Scenario Outline: Verify the header text of the weather results table
    When I search for <postcode>
    Then I should see the table and the header

    Examples:
      | postcode  |
      | "A99 9AA" |

  Scenario Outline: Verify the contents of the weather results table
    When I search for <postcode>
    Then I should see the table with the contents
    """
    Time
    Summary
    Icon
    Nearest Storm Distance
    Precip Intensity
    Precip Intensity Error
    Precip Probability
    Precip Type
    Temperature
    Apparent Temperature
    Dew Point
    Humidity
    Pressure
    Wind Speed
    """
    Examples:
      | postcode  |
      | "A99 9AA" |

  Scenario Outline: User should see an error message when postcode is not found
    When I search for <postcode>
    Then I should see error message "Unable to find the postcode."
    Examples:
      | postcode |
      | "B999AA" |

  Scenario Outline: Verify date format in the results table
    When I search for <postcode>
    Then I should see the table and the header
    And time should be in  "DD/MM/YYYY HH:mm:ss" format
    Examples:
      | postcode  |
      | "A99 9AA" |

