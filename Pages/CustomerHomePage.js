var help = require('../Utilities/helper')
/**
 * Customer Home page of the application
 */
var CustomerHomePage = function () {

   //locators on customer homepage
   var transactionsLocator = by.buttonText('Transactions');
   var deposit = element(by.buttonText('Deposit'));
   var withdrawl = element(by.buttonText('Withdrawl'));

   //Withdraw and deposit fields
   var amountLocator = by.model('amount');
   var amount = element(by.model('amount'));
   var withdraw = element(by.buttonText('Withdraw'));
   var depositButton = element(by.css('button.btn-default'));

   //message locator
   var messageLocator = by.css("span.error")

   var transactionLocator;
   //this.messageLocator =  element(by.xpath("//span[text()[contains(.,'Deposit Successful')]]"));
   var expectedCondition = protractor.ExpectedConditions;

   //function to handle Deposit transaction 
   this.depositTransaction = async function (transactionAmount) {

      help.waitTillUrlContains('account');

      await deposit.click();
      help.waitTillElementIsPresent(element(amountLocator));

      await element(amountLocator).sendKeys(transactionAmount);
      return await depositButton.click();
   };

   this.withdrawlTransaction = async function (transactionAmount) {
      help.waitTillUrlContains('account');

      await withdrawl.click();
      help.waitTillElementIsPresent(withdraw);
      await element(amountLocator).sendKeys(transactionAmount);
      await withdraw.click();
   };

   //function to navigate to transaction list
   this.viewTransaction = async function () {
      //console.log("here")
      help.waitTillUrlContains('account');

      await element(transactionsLocator).click().then(function (e) {
         help.waitTillUrlContains('listTx');

         //browser.sleep(2000)
      });

      //console.log("here")
      /*    let locator="//tr/td[contains(text(),'"+transactionAmount+"')]/following-sibling::td[contains(text(),'"+transactionType+"')]"
         transactionLocator=by.xpath(locator);
         
         return   await element(by.xpath(locator)).isPresent(); */
      return;
   };


   //function to get transaction message
   this.getTransactionMessage = async function () {
      browser.wait(expectedCondition.presenceOf(element(messageLocator), help.globalWait)).then(function () { browser.wait(expectedCondition.textToBePresentInElement(element(messageLocator), ' '), help.globalWait) })
      return element(messageLocator).getText();
   };
};
module.exports = new CustomerHomePage();