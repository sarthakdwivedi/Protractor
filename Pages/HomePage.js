var property=require('../Utilities/property') 
var help=require('../Utilities/helper')
/**
 * Home page of the application
 */
var Homepage = function () {


    //Webelement declaration
    var customerLogin = element(by.buttonText('Customer Login'));
    var bankManagerLogin = element(by.buttonText('Bank Manager Login'));
   
    //get the homepage
    this.get =  function () {
       
        return  browser.get(property.getValue("url")); 
        
    };

    //Click customer Login button
    this.clickCustomerLogin = function () {
        help.waitTillElementIsClickable(customerLogin);
        return customerLogin.click().then(function(e){
            help.waitTillUrlContains('customer');
        })
    };

    //Click Bank Manager Login button
    this.clickBankManager =  function () {
        help.waitTillElementIsClickable(bankManagerLogin);
       
        return  bankManagerLogin.click().then(function(e){
            help.waitTillUrlContains('manager')
            
         });
        
    };

    //Get title of Homepage
    this.getTitle = async function () {       
        return browser.getTitle();
    };

    
};
module.exports = new Homepage();