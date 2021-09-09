var property = require('../Utilities/property')
var help = require('../Utilities/helper')
/**
 * Home page of the application
 */
var TransactionPage = function () {


    //Elements on Customer List
  
    var transactionTable = element(by.tagName('table'));
    var rowLocator = by.tagName('tr');
    var cellLocator = by.tagName('td');
   

    //get the homepage
    this.isTransactionPresent = async function (trancsactionAmount, transactionType) {

        await help.waitTillUrlContains("listTx")

        //browser.sleep(2000)
        
       
        //console.log("here2")
        let isPresent= await element.all(rowLocator).filter(async function (elem, index) {
            
            return await elem.all(cellLocator).get(1).getText().then(function (text) {
                //console.log("here1")
                return text == trancsactionAmount;
            })
                &&
                await elem.all(cellLocator).get(2).getText().then(function (text) {
                    return text === transactionType;
                })
                
               
        }).then(function(items) {
            
            return items.length;
          });;

         return isPresent>0;

    };



};
module.exports = new TransactionPage();