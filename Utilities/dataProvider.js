var data= require("../resources/data.json")
//This will read the data from data.json
var DataProvider = function() {

    //getting customer data based on index
    this.getCustomerData=function(index){
        return data.Customers[index];
    }

    //get deposit details based on index
    this.getDepositAmount=function(index){
        return data.DepositTransaction[index];
    }

    //get the withdrawal amount based on index
    this.getWithdrawlAmount=function(index){
        return data.WithdrawalTransaction[index];
    }

    //get invalid withdrawl amount based on index
    this.getinvalidWithdrawlAmount=function(index){
        return data.InvalidWithdrawalTransaction[index];
    }

  };
  module.exports = new DataProvider();