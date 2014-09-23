var GenResponse = require('../_core/GenResponse.js');
var BasicResponse = require('../_core/BasicResponse.js');
var configService = require('../../configService.js');
var dbConfig = configService.getModuleConfig('_db');

var UserAuthController = function() {
    
    var self = this;
    
    self.actionPost = function(req, res, next) {
        
        var mongoDbo = require('../_db/MongoDbo.js');
        
        var tRes = new GenResponse();
        tRes.code = 200;
        tRes.message = 'Post OK';
        tRes.data = req.body;
        res.send(tRes);
        return next();
    };
};

module.exports = new UserAuthController;
