var help = require('../Utilities/helper')
/**
 * Manager Home page of the application
 */
var ManagerHomePage = function () {

    //Elements on manager's homepage
    var addCustomer = element(by.buttonText('Add Customer'));
    var openAccount = element(by.buttonText('Open Account'));
    var customers = element(by.buttonText('Customers'));

    //Elements on Add Customer
    var firstName = element(by.model('fName'));
    var lastName = element(by.model('lName'));
    var zipcode = element(by.model('postCd'));
    var addCustomerButton = element(by.css('button[type=submit]'));

    //Elements on Add account
    var customer = element(by.id('userSelect'));
    var currency = element(by.id('currency'));
    var processButton = element(by.buttonText('Process'));

    //Adding new customer
    this.addNewCustomer = async function (fName, lName, zpcode) {

        
        help.waitTillUrlContains('manager')
        
        //clicking add customer
        await addCustomer.click();
        help.waitTillUrlContains('addCust')
       
        //filling all details
        await firstName.sendKeys(fName);
        await lastName.sendKeys(lName);
        await zipcode.sendKeys(zpcode);
        return addCustomerButton.click();

    };

    //add account
    this.addAccount = async function (customerName, curr) {
        help.waitTillUrlContains('manager')
        await openAccount.click().then(function(){
            
            help.waitTillUrlContains('openAccount')
        });
       
        //filling account information
        await help.selectDropdownbyVisibleText(customer, customerName);
        await help.selectDropdownbyValue(currency, curr);
        return processButton.click();

    };

    //opening customer list
    this.openCustomerList = async function () {
 
        help.waitTillUrlContains("manager")
        help.waitTillElementIsClickable(customers);
        return await customers.click().then(function(){
            help.waitTillUrlContains("list")
        
            //browser.sleep(2000);
        });
       
       
        return;

    };

   
    //function to get alert text
    this.getAlertText = async function () {

        //waiting for element to be present
        await help.waitTillAlertIsPresent();
        let alertPopup = await browser.switchTo().alert().catch(function(e){
            console.log(e)
        });

        //getting text from alert box
        let text = await alertPopup.getText();
        // await alertPopup.accept().then(browser.wait(expectedCondition.not(expectedCondition.alertIsPresent()), 5000));

        return text;
    };

};
module.exports = new ManagerHomePage();