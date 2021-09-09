var help = require('../Utilities/helper')
/*
*Login page for Customer
*/
var CustomerLoginPage = function () {

    //object for customer login page
    var customerLogin = element(by.id('userSelect'));
    var loginButton = element(by.buttonText('Login'));

   
    //login using customer name
    this.loginAsCustomer = async function (customerName) {
        help.waitTillUrlContains('customer')
        await help.selectDropdownbyVisibleText(customerLogin,customerName);
        return await loginButton.click();
    };


};
module.exports = new CustomerLoginPage();