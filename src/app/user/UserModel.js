var configService = require('../../configService.js');
var config = configService.getModuleConfig('');

var UserModel = function() {

    var self = this;
    self.id = null;
    self.idUserCreateBy = null;
    self.username = "";
    self.password = "";
    self.email = "";
    self.status = "inactive";
    self.dateCreated = null;
    
    self.init = function(){
        var d = new Date();
        self.dateCreate = d.parse(config.date.format);
    };

    self.set = function(key, val) {
        
        if(self[key] !== undefined){
            
            self[key] = val;
        }
    };

    self.get = function(key, defaultVal) {

        if (self[key] !== undefined) {

            return self[key];
        }

        return defaultVal;
    };
    
    self.init();
};

module.exports = UserModel;