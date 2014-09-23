var configService = require('../../configService.js');
var userConfig = configService.getModuleConfig('user');
var validations = userConfig.validations;

var UserValidation = function(obj) {
    
    var self = this;
    self.obj = obj;
    self.errors = [];
    
    // VALIDATIONS //
    self.setError = function(code, property, message){
        
        self.errors.push({code: code, property: property, message: message});
    };

    self.isValidUsername = function() {
        
        if (typeof(self.obj.username !== 'string')){
            
            self.setError(406, 'username', 'must be string');
            return false;
        }

        if (self.obj.username.length < validations.username.minLength) {
            
            self.setError(406, 'username', 'must be at least ' + validations.username.minLength);
            return false;
        }

        if (self.obj.username !== self.obj.username.match(validations.username.regex)) {
            self.setError(406, 'username', 'must meet format requirements.');
            return false;
        }

        return true;
    };

    self.isValidPassword = function() {

        if (typeof(self.obj.password !== 'string')){
            
            self.setError(406, 'password', 'must be string');
            return false;
        }
        
        if (self.obj.password.length < validations.password.minLength) {
            
            self.setError(406, 'password', 'must be at least ' + validations.username.minLength);
            return false;
        }

        if (self.obj.password !== self.password.match(validations.password.regex)) {
            
            self.setError(406, 'password', 'must meet format requirements.');
            return false;
        }

        return true;
    };

    self.isValidEmail = function() {

        if (typeof(self.obj.email !== 'string')){
            
            self.setError(406, 'email', 'must be string');
            return false;
        }
        
        if (self.obj.email !== self.password.match(validations.email.regex)) {
            self.setError(406, 'email', 'must meet format requirements.');
            return false;
        }

        return true;
    };

    self.isValidStatus = function() {

        if (validations.status.valid[self.obj.status]) {
            
            self.setError(406, 'status', 'must be valid status: ' + JSON.stringify(validations.status.valid));
            return true;
        }

        return false;
    };
    
    self.isValidDateCreated = function(){
        
        if (typeof(self.obj.dateCreated !== 'string')){
            self.setError(406, 'dateCreated', 'must be string');
            return false;
        }
        
        // @todo Validate format
        
        return true;
    };

    self.isValid = function() {

        if (self.isValidUsername() && self.isValidPassword() && self.isValidEmail && self.isValidStatus()) {

            return true;
        }

        return false;
    };
};

module.exports = UserValidation;