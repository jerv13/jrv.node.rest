/*
 * test config
 */
var config = {
    routes: [
        {
            id: '0',
            method: 'get',
            path: '/test/:name',
            version: '',
            controller: require('./TestController')
        },
        {
            id: '0',
            method: 'post',
            path: '/test/:name',
            version: '',
            controller: require('./TestController')
        },
        {
            id: '0',
            method: 'put',
            path: '/test/:name',
            version: '',
            controller: require('./TestController')
        },
        {
            id: '0',
            method: 'del',
            path: '/test/:name',
            version: '',
            controller: require('./TestController')
        }
    ]
};

module.exports = config;
