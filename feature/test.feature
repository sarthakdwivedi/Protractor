Feature: NAGP XYZ bank Operation Demo
   Scenario Outline: Create Customer

      Given Manager is logged in
      When Manager creates a customer as "<CustomerDetails>"
      Then customer should be created
      Examples:
         | CustomerDetails |
         | Customer1       |
   # |Customer2|

   Scenario: Add account for a customer
      Given Manager is logged in
      When Manager Adds account for the customer "Customer1"
      Then Accounts should be added

   Scenario Outline: Deposit to account by the customer

      Given Customer "Customer1" is logged in
      When Customer do a deposit of <TransactionAmount>
      Then Message "Deposit Successful" should be displayed
      And Deposit transaction of <TransactionAmount> should be present in the transaction list
      Examples:
         | TransactionAmount |
         | 1                 |

   Scenario: Withdrawl more than balance from account by the customer
      Given Customer "Customer1" is logged in
      When Customer do a withdrawl of "InvalidWithdrawlTransaction1"
      Then Message "Transaction Failed.You can not withdraw amount more than the balance." should be displayed



   Scenario Outline:  Withdrawl from account by the customer
      Given Customer "Customer1" is logged in
      When Customer do a withdrawl of "<TransactionAmount>"
      Then Message "Transaction successful" should be displayed
      Then Withdrawl transaction "<TransactionAmount>"  should be present in the transaction list
      Examples:
         | TransactionAmount     |
         | WithdrawlTransaction1 |

   Scenario:Delete Customer
      Given Manager is logged in
      When Manager delete the customer "Customer1"
      Then customer "Customer1" should be Deleted