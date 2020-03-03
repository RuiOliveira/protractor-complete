var merge = require('merge');
var config = require('./../spec-base-conf.js').config;

exports.config = merge.recursive(true, config, {
    seleniumAddress: 'http://seleniumgrid.mindera.com:4444/wd/hub',
    params: {
        protocol: 'https://',
        domain: 'app-mock.statful.com',
        port: 80
    },
    specs: [
        './**/*-spec.js'
    ]
});
