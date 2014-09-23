/*
 * config
 * Root config file
 */
var package = require('./package.json');
var nodejsPath = require('path');

var config = {
    env: {
        appRoot: __dirname
    },
    server: {
        //certificate: '',
        host: 'localhost',
        //key: '',
        name: package.name,
        port: 8080,
        version: 'v' + package.version
    },
    log: {
        streams: [
            {
                path: nodejsPath.resolve(__dirname, '../logs/log.log'),
                // stream:
                level: 'debug'
            },
            {
                path: nodejsPath.resolve(__dirname, '../logs/log.log'),
                level: 'trace'
            },
            {
                path: nodejsPath.resolve(__dirname, '../logs/log.log'),
                level: 'info'
            },
            {
                path: nodejsPath.resolve(__dirname, '../logs/log.log'),
                level: 'warn'
            },
            {
                path: nodejsPath.resolve(__dirname, '../logs/log.log'),
                level: 'error'
            }
        ]
    },
    date: {
        format: "yyyy-mm-dd'T'HH:MM:ss'Z'"
    }
};

module.exports = config;