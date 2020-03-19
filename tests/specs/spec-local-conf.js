
var merge = require('merge');
var config = require('./../../spec-base-conf.js').config;

exports.config = merge.recursive(true, config, {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome', //firefox, internet explorer
        shardTestFiles: true,
        maxInstances: 3
    },
    enableDelay: false,
    //specs: ['./*-spec.js']
    specs: ['./*element-basics-dataprovider-spec.js'],
    suites: {
        smoke: ['./chainLocators-spec.js','./dropdown.spec.js'],
        sanity:[],
        regression: ['./element-basics-dataprovider-spec.js']
    }
});
