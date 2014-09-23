/*
 * test config
 */
var config = {
    routes: [
        {
            id: '0',
            method: 'get',
            path: '/config_test/:name',
            version: '',
            controller: require('./TestController')
        }
    ]
};

module.exports = config;
