var property = require('../Utilities/property')
var help = require('../Utilities/helper')
/**
 * Customer list page of the application
 */
var CustomerListPage = function () {


    //Elements on Customer List
    var searchCustomer = element(by.model('searchCustomer'));
    var customerTable = element(by.tagName('table'));
    var rowLocator = by.tagName('tr');
    var cellLocator = by.tagName('td');
    var buttonLocator = by.buttonText('Delete');

    //Delete the customer 
    this.DeleteCustomer = (async function (customerFirstName, customerLastName, zpcode) {

        help.waitTillElementIsPresent(customerTable);

        await searchCustomer.clear();
        await searchCustomer.sendKeys(customerFirstName);

        await customerTable.all(rowLocator).filter(async function (elem, index) {
           
            return await elem.all(cellLocator).get(0).getText().then(function (text) {
                //console.log("here")
                return text === customerFirstName;
            })
                &&
                await elem.all(cellLocator).get(1).getText().then(function (text) {
                    return text === customerLastName;
                })
                &&
                await elem.all(cellLocator).get(2).getText().then(function (text) {
                    return text === zpcode;
                })
        }).first().all(buttonLocator).get(0).click();


        return

    });

    //to check if customer is present in the list
    this.isCustomerPresent = (async function (customerFirstName, customerLastName, zpcode) {

        help.waitTillElementIsPresent(customerTable);
        await searchCustomer.clear();
        await searchCustomer.sendKeys(customerFirstName);


        let isPresent=await customerTable.all(rowLocator).filter(async function (elem, index) {
           
            return await elem.all(cellLocator).get(0).getText().then(function (text) {
                //console.log("here")
                return text === customerFirstName;
            })
                &&
                await elem.all(cellLocator).get(1).getText().then(function (text) {
                    return text === customerLastName;
                })
                &&
                await elem.all(cellLocator).get(2).getText().then(function (text) {
                    return text === zpcode;
                })
        }).then(function(items) {
            //console.log(items.length)
            return items.length;
          });;

       

        return isPresent>0;

    });
    

};
module.exports = new CustomerListPage();