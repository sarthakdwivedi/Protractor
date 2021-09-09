var property = require('../Utilities/property')
const globalWait = Number(property.getValue('globalWait'));

//different webdriver methods to be used in different page class
var Helper = function () {
  var expectedCondition = protractor.ExpectedConditions;

  //Select option based on index
  this.selectDropdownbyIndex = async function (ele, index) {
    if (index) {
      var options = await ele.all(by.tagName('option'))
        .then(function (options) {

          return options[index].click();
        });
    }
  };

  //Select option based on value
  this.selectDropdownbyValue = async function (ele, value) {

    if (value) {
      var options = await ele.all(by.tagName('option')).filter(function (elem, index) {
        return elem.getAttribute('value').then(function (text) {
          return text === value;
        });
      }).first().click();
    }
  };

  //select based on visible text
  this.selectDropdownbyVisibleText = async function (ele, visibleText) {
    
    if (visibleText) {
      var options = await ele.all(by.tagName('option')).filter(function (elem, index) {
        return elem.getText().then(function (text) {
          return text === visibleText;
        });
      }).first().click();

    }

    
  };

  //function to wait for url to contain text
  this.waitTillUrlContains = (function (text) {
    browser.wait(expectedCondition.urlContains(text), globalWait).catch((error) => {
      console.log(`error = ${error}`);
    });;
  })

  //function to wait till element is clickable
  this.waitTillElementIsClickable = (function (element) {
    browser.wait(expectedCondition.elementToBeClickable(element), globalWait).catch((error) => {
      console.log(`error = ${error}`);
    });
  })

  //function to wait till element is present
  this.waitTillElementIsPresent = (function (element) {
    return browser.wait(expectedCondition.presenceOf(element), globalWait).catch((error) => {
      console.log(`error while waiting for element = ${error}`);
    });
  })

  //function to wait till alert is present
  this.waitTillAlertIsPresent = (function () {
    return browser.wait(expectedCondition.alertIsPresent(), globalWait).catch((error) => {
      console.log(`error while waiting for Alert = ${error}`);
    });
  })
};
module.exports = new Helper();