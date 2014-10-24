var fs = require('fs');
var nodejsPath = require('path');
var defaultModulePath = nodejsPath.resolve(__dirname, 'app');
var merge = require('merge'), original, cloned;

var ConfigService = function (modulePath) {

    var self = this;
    self.MODULE_PATH = modulePath;
    self.CONFIG_FILE = "config.js";

    self.config = null;

    self.buildRootConfig = function () {

        if (!self.config) {

            self.config = self.getConfigFromPath(self.CONFIG_FILE);
        }
    };

    self.getConfigFromPath = function (path) {

        var resource = nodejsPath.resolve(__dirname, path);

        if (fs.existsSync(resource)) {

            config = require(resource);
            console.log("Loading: Config for : " + path + ".");
            return config;
        } else {

            // log Warn: Config for module not found
            console.warn("NOT FOUND: Config for : " + path + ".");
            return null;
        }
    };

    self.getConfig = function (key, onComplete) {

        if (self.config[key]) {

            if (typeof onComplete === 'function') {

                onComplete(self.config[key]);
            }
            return self.config[key];
        }

        return null;
    };

    self.getModuleConfig = function (module, onComplete) {

        var rootModuleConfig = self.getConfig('module');
//
//        if (rootModuleConfig[module]) {
//
//            if (typeof onComplete === 'function') {
//
//                onComplete(rootModuleConfig[module]);
//            }
//
//            return rootModuleConfig[module];
//        }

        var moduleConfig = self.getConfigFromPath(
            self.MODULE_PATH + '/' + module + '/' + self.CONFIG_FILE
            );

        self.config['module'][module] = null;
        
        console.log('getModuleConfig----------', module);
        console.log('--moduleConfig', moduleConfig);
        console.log('--rootModuleConfig', rootModuleConfig);

        if (moduleConfig && rootModuleConfig[module]) {

            console.log('MERGE', module);

            self.config['module'][module] = merge.recursive(
                true,
                rootModuleConfig[module],
                moduleConfig
                );
        }

        if (!self.config['module'][module] && rootModuleConfig[module]) {

            self.config['module'][module] = rootModuleConfig[module];
        }

        if (!self.config['module'][module] && moduleConfig) {

            self.config['module'][module] = moduleConfig;
        }

        if (typeof onComplete === 'function') {

            onComplete(self.config['module'][module])
        }
        
        console.log('--FINALModuleConfig', self.config['module'][module]);

        return self.config['module'][module];
    };

    self.buildRootConfig();
};

// Functions which will be available to external callers
module.exports = new ConfigService(defaultModulePath);
