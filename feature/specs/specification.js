var homePage = require("../../Pages/HomePage");
var managerHomePage = require("../../Pages/ManagerHomePage");
var customerLoginPage = require("../../Pages/CustomerLoginPage");
var customerHomePage = require("../../Pages/CustomerHomePage");
var transactionPage = require("../../Pages/TransactionPage");
var customerList = require("../../Pages/CustomerList");
var data = require("../../Utilities/dataProvider");
var prop = require("../../Utilities/property");
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(15 * 1000);
const timeout=Number(prop.getValue("globalWait"));
Before(async function (scenario) {
    await homePage.get();
    expect(homePage.getTitle()).to.eventually.equal("Protractor practice website - Banking App")
    //console.log(timeout)
    browser.sleep(timeout);
});

Given('Manager is logged in', async function () {
    // Write code here that turns the phrase above into concrete actions
    await homePage.clickBankManager();
    //browser.sleep(2000);

});

When('Manager creates a customer as {string}', async function (customerIdentifiers) {
    // Write code here that turns the phrase above into concrete actions
    var index = Number(customerIdentifiers.replace("Customer", "")) - 1;
    await managerHomePage.addNewCustomer(data.getCustomerData(index).firstName, data.getCustomerData(index).lastName, data.getCustomerData(index).zipcode)
});

Then('customer should be created', function () {
    // Write code here that turns the phrase above into concrete actions
    expect(managerHomePage.getAlertText()).to.eventually.include("Customer added successfully with customer id")
});

When('Manager Adds account for the customer {string}', async function (customerIdentifier) {
    // Write code here that turns the phrase above into concrete actions
    let index = Number(customerIdentifier.replace("Customer", "")) - 1;
    return await managerHomePage.addAccount(data.getCustomerData(index).firstName + " " + data.getCustomerData(index).lastName, data.getCustomerData(index).currency)
    //return 'pending';
});
Then('Accounts should be added', function () {
    // Write code here that turns the phrase above into concrete actions
    expect(managerHomePage.getAlertText()).to.eventually.include("Account created successfully with account Number")
});
Given('Customer {string} is logged in', async function (customerIdentifier) {
    // Write code here that turns the phrase above into concrete actions
    let index = Number(customerIdentifier.replace("Customer", "")) - 1;
    let username = data.getCustomerData(index).firstName + " " + data.getCustomerData(index).lastName;
    await homePage.clickCustomerLogin();
    return await customerLoginPage.loginAsCustomer(username);

});

When('Customer do a deposit of {int}', function (depositTransactionIndex) {
    let index = Number(depositTransactionIndex) - 1;
    return customerHomePage.depositTransaction(data.getDepositAmount(index).transactionAmount);
});

Then('Message {string} should be displayed', function (message) {
    // Write code here that turns the phrase above into concrete actions
    //browser.sleep(2000)
    return expect(customerHomePage.getTransactionMessage()).to.eventually.equal(message);
    //return expect(customerHomePage.messageLocator.getText()).to.eventually.equal(message);
});


Then('Deposit transaction of {int} should be present in the transaction list', async function (depositTransactionIndex) {
    
    let index = Number(depositTransactionIndex) - 1;
    await customerHomePage.viewTransaction()
    //browser.sleep(2000)
    let isPresent=await transactionPage.isTransactionPresent(data.getDepositAmount(index).transactionAmount, "Credit");
    expect(isPresent).to.be.true;

});

When('Customer do a withdrawl of {string}', function (withdrawlTransactionIndex) {
    let transactionAmount;
    if (withdrawlTransactionIndex.indexOf("InvalidWithdrawlTransaction") >= 0) {
        withdrawlTransactionIndex = withdrawlTransactionIndex.replace("InvalidWithdrawlTransaction", "")

        index = isNaN(Number(withdrawlTransactionIndex)) ? 0 : Number(withdrawlTransactionIndex) - 1;
        //console.log("incorrect withdrawl index is"+index)
        transactionAmount = data.getinvalidWithdrawlAmount(index).transactionAmount;
    }
    else {
        let index = Number(withdrawlTransactionIndex.replace("WithdrawlTransaction", "")) - 1;
        //console.log(" withdrawl index is"+index)
        transactionAmount = data.getWithdrawlAmount(index).transactionAmount
    }

    return customerHomePage.withdrawlTransaction(transactionAmount);
});

Then('Withdrawl transaction {string}  should be present in the transaction list', async function (withdrawlTransactionIndex) {
    
    let index = Number(withdrawlTransactionIndex.replace("WithdrawlTransaction", "")) - 1;
    
    await customerHomePage.viewTransaction();
    let isPresent = await transactionPage.isTransactionPresent(data.getWithdrawlAmount(index).transactionAmount, "Debit");
    expect(isPresent).to.be.true;
});
When('Manager delete the customer {string}', async function (customerIdentifier) {
    // Write code here that turns the phrase above into concrete actions
    let index = Number(customerIdentifier.replace("Customer", "")) - 1;
    //browser.sleep(4000)
    await managerHomePage.openCustomerList()
    await customerList.DeleteCustomer(data.getCustomerData(index).firstName, data.getCustomerData(index).lastName, data.getCustomerData(index).zipcode)
    //browser.sleep(4000)
});

Then('customer {string} should be Deleted', async function (customerIdentifier) {
    // Write code here that turns the phrase above into concrete actions
    let index = Number(customerIdentifier.replace("Customer", "")) - 1;
    let isPresent =  await customerList.isCustomerPresent(data.getCustomerData(index).firstName, data.getCustomerData(index).lastName, data.getCustomerData(index).zipcode);
    expect(isPresent).to.be.false;
});


After(function (scenario) {
    if (scenario.result.status === 'failed') {
        var attach = this.attach;
        return browser.takeScreenshot().then(function (png) {
            var decodedImage = new Buffer.from(png, "base64");
            return attach(decodedImage, "image/png");
        });
    }
});
