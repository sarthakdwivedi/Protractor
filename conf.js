var cucumber = require('cucumber');
var chai = require('chai');
var chaiaspromised = require('chai-as-promised');
chai.use(chaiaspromised);
var reporter = require('cucumber-html-reporter');
var cucumberReportDirectory = 'protractor_reports';
var jsonReportFile = cucumberReportDirectory + '/cucumber_report.json';
var format = require('date-format');
var runDate=format.asString('dd_MM_yy_hh_mm_ss', new Date())
var reportName='CucumberReport' + '/report_'+runDate+'.html';
var path = require('path');
const directoryPath = path.join(__dirname, '/Utilities/fileUtility');
var fileUtil=require(directoryPath)
exports.config = {

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    specs: ['./feature/*.feature'],
    capabilities: {
        browserName: 'chrome',
        unexpectedAlertBehaviour: 'accept',
        /*  chromeOptions: {
             args: ["--window-size=1920,1080", "--disable-gpu"],
         }, */
    },

    onPrepare: function () {
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
        browser.ignoreSynchronization = true;
        global.Given = cucumber.Given;
        global.When = cucumber.When;
        global.Then = cucumber.Then;
        global.expect = chai.expect;
        global.After = cucumber.After;
        global.Before = cucumber.Before;
        fileUtil.archivePreviousReports();
    },
    cucumberOpts: {

        require: ['./features/specs/*.specification.js'],
        format: ['node_modules/cucumber-pretty'],
        format: 'json:./' + jsonReportFile,
        defaultTimeoutInterval: 30000,

    },
    onComplete: function () {
        //var date=Date.now();
        var options = {
            
            theme: 'bootstrap',
            jsonFile: jsonReportFile,
            output: reportName,
            reportSuiteAsScenarios: true,
            launchReport: true,
            metadata: {
                "App Version": "0.3.2",
                "Test Environment": "QA",
                "Browser": "Chrome",
                "Platform": "Windows 10",
                "Parallel": "Scenarios",
                "Executed": "Local"
            }
        };

        reporter.generate(options);
    }
}