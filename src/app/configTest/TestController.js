var GenResponse = require('../_core/GenResponse.js');
var BasicResponse = require('../_core/BasicResponse.js');
var configService = require('../../configService.js');

var TestController = function() {

    var self = this;

    self.actionGet = function(req, res, next) {

        var tRes = new GenResponse();
        tRes.code = 200;
        tRes.message = 'GET OK';
        tRes.data = configService.getModuleConfig('');
        res.send(tRes);
        
        return next();
    };
};

module.exports = new TestController;
