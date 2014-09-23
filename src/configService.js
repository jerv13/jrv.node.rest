var fs = require('fs');
var nodejsPath = require('path');
var defaultModulePath = nodejsPath.resolve(__dirname, 'app');

var ConfigService = function(modulePath) {

    var self = this;
    self.modulePath = modulePath;
    self.CONFIG_FILE = "config.js";
    
    self.cache = {};

    self.getConfigPath = function(module) {
        
        if(typeof(module) !== "string" || module === ""){
            
            return nodejsPath.resolve(__dirname, self.CONFIG_FILE); // root config
        }

        return nodejsPath.resolve(__dirname, self.modulePath + '/' + module + '/' + self.CONFIG_FILE);
    };

    self.getModuleConfig = function(module) {

        var path = self.getConfigPath(module);

        var config = self.getCache(module, null);
        
        if(config !== null){
            // has cache
            return config;
        }
        // require.resolve(path)
        if (fs.existsSync(path)) {
            
            config = require(path);
            console.log("Loading: Config for module: " + module + ".");
            self.setCache(module, config);
            return config;
        } else {

            // @todo log Warn: Config for module not found
            console.warn("NOT FOUND: Config for module: " + module + ".");
        }

        return null;
    };

    self.getCache = function(module, defaultValue) {
        
        if(self.cache[module]){
            
            return self.cache[module];
        }
        
        return defaultValue;
    };

    self.setCache = function(module, value) {
        
        self.cache[module] = value;
    };
};

// Functions which will be available to external callers
module.exports = new ConfigService(defaultModulePath);
