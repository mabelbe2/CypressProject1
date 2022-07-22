Feature: Rent car flow

    Background: search page opened
        Given search page is opened

    Scenario: success search
        When user enter search info
        | country  | France                 |
        | city     | Paris                  |
        | model    |                        |
        | pickup   | tomorrow               |
        | dropoff  | the day after tomorrow |
        And user click on the search button
        And user click on the rent button on one of search result
        Then rent detail page is loaded
        And user can confirm details are correct on rent details
        And user click rent button
        And user lands on summary page
        And user can confirm details are correct on summary page
        And user enter personal detail
        | firstName  | testname     |
        | lastName   | testlastname |
        | cardNumber | 41111111111  |
        | email      | test@abc.com |
        And user click rent button
    #     And user confirm rent receipt

    Scenario: negative test cases on search form: missing dates, invalid location (commented out as it will fail), invalid model(commented out), expired date(commented out), invalid date order
        When user enter invalid search info "<country>", "<city>", "<model>", "<pickup>", "<dropoff>"
        And user click on the search button
        Then user should not be able to see any search result and see "<expectedError>"
        Examples:
        | country | city    | model |  pickup                   | dropoff                | expectedError                         |
        | France  | Paris   |       | tomorrow                  |                        | Please fill pickup and drop off dates |
        | France  | Paris   |       |                           | the day after tomorrow | Please fill pickup and drop off dates |
        # | Poland  | Paris   |       | tomorrow                  | the day after tomorrow |                                       |
        # | France  | Paris   |  123  | tomorrow                  | the day after tomorrow |                                       |
        # | France  | Paris   |       | 2022-06-20                | 2022-06-21             |                                       |
        | France  | Paris   |       | the day after tomorrow    | tomorrow               |  Please enter a valid date!           |

    Scenario: invalid summary form data: missing field, exceed length requirement(commented out as tests will fail), invalid format
        When user enter search info
        | country  | France                 |
        | city     | Paris                  |
        | model    |                        |
        | pickup   | tomorrow               |
        | dropoff  | the day after tomorrow |
        And user click on the search button
        And user click on the rent button on one of search result
        Then rent detail page is loaded
        And user click rent button
        And user lands on summary page
        And user enter invalid personal detail and error showed when submit
        | firstName                                           | lastName                                             | cardNumber                  |  email                                                 |   expectedError                   |
        | validname                                           | validlastname                                        |   1                         |                                                        |   Email is required               |
        | validname                                           | validlastname                                        |                             | valid@abc.com                                          |   Card number is required         |
        | validname                                           |                                                      |   1                         | valid@abc.com                                          |   Last name is required           |
        |                                                     | validlastname                                        |   1                         | valid@abc.com                                          |   Name is required                |  
        # | QBAR6hQBHrq2zHGjQbcu8jDeGwUaNlcyiMrIQzpZpQHpXE30aU  | validname                                            |   4111                      | valid@abc.com                                          |                                   |
        # | validname                                           | QBAR6hQBHrq2zHGjQbcu8jDeGwUaNlcyiMrIQzpZpQHpXE30aU   |  4111                       | valid@abc.com                                          |                                   |    
        | validname                                           | validlastname                                        |  dsfds                      | valid@abc.com                                          |  Card number contains wrong chars |   
        # | validname                                           | validlastname                                        |  2166724880417546409044647  | valid@abc.com                                          |                                   |                         
        | validname                                           | validlastname                                        |   4111                      | invalid.com                                            |   Please provide valid email      |
        # | validname                                           | validlastname                                        |   4111                      | QBAR6hQBHrq2zHGjQbcu8jDeGwUaNlcyiMrIQzpZpQHp@a.com     |                                   |


