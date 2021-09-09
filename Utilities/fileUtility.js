var path = require('path');
var fs = require('fs');

//class to handle file functions
var FileUtil = function () {

    //function to archive report to archive folder
    this.archivePreviousReports = (function () {
        const directoryPath = path.join(__dirname, '/../CucumberReport/');
        //console.log(directoryPath);
        const destination = path.join(directoryPath, '/Archive/')
        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                if (path.basename(file).indexOf('html') > 0) {
                    let dest = path.join(destination, path.basename(file));
                    let source = path.join(directoryPath, path.basename(file));
                    fs.rename(source, dest, (err) => {
                        if (err) throw err;

                    });
                }
            }
            );
        });
    });
}
module.exports = new FileUtil();