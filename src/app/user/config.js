/*
 * user config
 */
var config = {
    routes: [
        {
            id: '0',
            method: 'post',
            path: '/user/auth',
            version: '',
            controller: require('./UserAuthController')
        }
    ],
    validations: {
       username: {
           minLength: 6,
           regex: /^[a-zA-Z0-9]+$/,
       },
       password: {
           minLength: 6,
           regex: /^[a-zA-Z0-9]+$/,
       },
       email: {
          regex: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
       },
       status: {
          valid: {active: true, inactive: true, unclaimed: true}
       }
    }
};

module.exports = config;
