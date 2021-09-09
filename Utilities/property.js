var fs = require('fs');
const path = require('path');

//function to read property file
var Property = function () {
    var filepath = path.join(__dirname, '../resources/property.properties')

    //console.log(filepath)
    var data = fs.readFileSync(filepath, 'utf8');

    //function to get value based on key
    this.getValue = (function (keyRe) {
        var pairs = data.split(";");
        var values = '';
        for (let i = 0; i < pairs.length; i++) {
            if (pairs[i].length > 0) {
                let parts = pairs[i].split("=");

                let key = parts[0].replace(/[\r\n]+/g, "");
                let value = parts[1].replace(/[\r\n]+/g, "");
                if (key == keyRe) {
                    values = value;
                }
            }
        }
        //console.log(values)
        return values;
    });
};
module.exports = new Property();