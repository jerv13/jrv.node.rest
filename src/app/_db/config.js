/*
 * _core config
 */
var config = {
    db: {
        mongo: {
            connect: 'mongodb://localhost/leagueman'
        },
        redis: {
            host: '192.168.0.210',
            port: 6379
        },
        mysql: {}
    }
};

module.exports = config;