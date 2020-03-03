/*eslint-disable no-console */

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var _ = require('lodash');

var reporter = new HtmlScreenshotReporter({
    dest: 'screenshots',
    filename: 'spec-report.html',
    captureOnlyFailedSpecs: true,
    showSummary: false,
    showConfiguration: false,
    ignoreSkippedSpecs: true,
    cleanDestination: true,
    reportTitle: null
});

exports.config = {
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 5
    },

    getPageTimeout: 30000,
    allScriptsTimeout: 30000,

    framework: 'jasmine2',
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 60000
    },
    enableErrorLogs: true,
    enableDelay: false,

    // A callback function called once configs are read but before any environment
    // setup. This will only run once, and before onPrepare.
    // You can specify a file containing code to run by setting beforeLaunch to
    // the filename string.
    beforeLaunch: () => {
        return new Promise(resolve => {
            reporter.beforeLaunch(resolve);
        });
    },

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
        require('babel-register');
        jasmine.getEnv().addReporter(reporter);
        var enableErrorLogs = true;
        var enableDelay = true;

        browser.getProcessedConfig().then(data => {
            enableErrorLogs = data.enableErrorLogs;
            enableDelay = data.enableDelay;
        });

        // Disables animations for tests
        const disableNgAnimate = () => {
            angular.module('disableNgAnimate', []).run([
                '$animate',
                $animate => {
                    $animate.enabled(false);
                }
            ]);
        };

        const disableCssAnimate = () => {
            angular.module('disableCssAnimate', []).run(() => {
                const style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML =
                    '* {' +
                    '-webkit-transition: none !important;' +
                    '-moz-transition: none !important' +
                    '-o-transition: none !important' +
                    '-ms-transition: none !important' +
                    'transition: none !important' +
                    '}';
                document.getElementsByTagName('head')[0].appendChild(style);
            });
        };

        browser.addMockModule('disableNgAnimate', disableNgAnimate);
        browser.addMockModule('disableCssAnimate', disableCssAnimate);

        return browser.driver.getSession().then(() => {
            browser.driver
                .manage()
                .window()
                .setSize(1280, 1024);

            afterEach(() => {
                // Close any confirm dialog present
                browser
                    .switchTo()
                    .alert()
                    .then(alert => {
                        alert.accept();
                    })
                    .catch(() => {});

                // Log every error thrown in browser
                if (enableErrorLogs) {
                    browser
                        .manage()
                        .logs()
                        .get('browser')
                        .then(browserLog => {
                            _.forEach(browserLog, error => {
                                console.log(error.level.name + ':' + error.message);
                            });
                        });
                }
            });

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

    // A callback function called once all tests have finished running and
    // the WebDriver instance has been shut down. It is passed the exit code
    // (0 if the tests passed). afterLaunch must return a promise if you want
    // asynchronous code to be executed before the program exits.
    // This is called only once before the program exits (after onCleanUp).
    afterLaunch: exitCode => {
        return new Promise(resolve => {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};
