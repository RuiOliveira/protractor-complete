var merge = require('merge');
var config = require('./../spec-base-conf.js').config;

exports.config = merge.recursive(true, config, {
    params: {
        protocol: 'http://',
        domain: 'local.statful',
        port: 9000
    },
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 3
    },
    directConnect: true,
    enableErrorLogs: false,
    enableDelay: false,
    specs: ['./**/*-spec.js']
});
