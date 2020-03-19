/*eslint-disable no-console */
var Jasmine2HtmlReporter  = require('protractor-jasmine2-html-reporter');

 var path = require('path');

exports.config = {
    getPageTimeout: 30000,
    allScriptsTimeout: 30000,
    framework: 'jasmine2',
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 60000,
        showColors: true
    },
    enableErrorLogs: true,
    enableDelay: false,

    // A callback function called once configs are read but before any environment
    // setup. This will only run once, and before onPrepare.
    // You can specify a file containing code to run by setting beforeLaunch to
    // the filename string.
    /*
    beforeLaunch: () => {
        return new Promise(resolve => {
            reporter.beforeLaunch(resolve);
        });
    },
    */
    // A callback function called once protractor is ready and available, and
    // before the specs are executed.
    // If multiple capabilities are being run, this will run once per
    // capability.
    // You can specify a file containing code to run by setting onPrepare to
    // the filename string.
    // onPrepare can optionally return a promise, which Protractor will wait for
    // before continuing execution. This can be used if the preparation involves
    // any asynchronous calls, e.g. interacting with the browser. Otherwise
    // Protractor cannot guarantee order of execution and may start the tests
    // before preparation finishes.
    onPrepare: () => {

        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: '../reports',
                screenshotsFolder: 'images',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: false,
                fixedScreenshotName: true,
                fileNamePrefix: 'protractor',
                //This option allow you to create a single file for each reporter.
                consolidate: false,
                consolidateAll: false,
                //
                cleanDestination: true,
                fileName: 'html-report',
                fileNameSeparator: '_',
                fileNamePrefix: '',
                fileNameSuffix: '',
                fileNameDateSuffix: true
            })
          );

        var enableDelay = true;

        browser.getProcessedConfig().then(data => {
            enableDelay = data.enableDelay;
        });

        return browser.driver.getSession().then(() => {
            browser.driver
                .manage()
                .window()
                .maximize();
                //.setSize(1280, 1024);
                

            beforeEach(() => {
                //Enable delay
                if (enableDelay) {
                    var origFn = browser.driver.controlFlow().execute;

                    browser.driver.controlFlow().execute = function () {
                        var args = arguments;

                        // queue 100ms wait
                        origFn.call(browser.driver.controlFlow(), () => {
                            return protractor.promise.delayed(100);
                        });

                        return origFn.apply(browser.driver.controlFlow(), args);
                    };
                }
            });
        });
    },
/*     specs: ['./tests/specs/*element-basics-dataprovider-spec.js'],
    suites: {
        smoke: ['./tests/specs/chainLocators-spec.js',
        './tests/specs/dropdown.spec.js'
        ],
        sanity:[],
        regression: ['./tests/specs/element-basics-dataprovider-spec.js']
    }    */
    // A callback function called once all tests have finished running and
    // the WebDriver instance has been shut down. It is passed the exit code
    // (0 if the tests passed). afterLaunch must return a promise if you want
    // asynchronous code to be executed before the program exits.
    // This is called only once before the program exits (after onCleanUp).
    /*
    afterLaunch: exitCode => {
        return new Promise(resolve => {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
    */
};
