/*
 * _core config
 */
var config = {
    _db: {
        mongo: {
            connect: 'mongodb://localhost/test'
        },
        redis: {
            host: '120.0.0.1',
            port: 6379
        },
        mysql: {}
    }
};

module.exports = config;