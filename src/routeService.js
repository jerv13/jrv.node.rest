var fs = require('fs');

var RouteService = function() {

    var self = this;
    self.methodPrefix = 'action';

    self.routes = [];

    self.buildRoutesFromConfig = function(configService) {

        // parse module folders
        var files = fs.readdirSync(configService.modulePath);
        
        for (var i in files) {
            
            if (!files.hasOwnProperty(i))
                continue;
            var name = configService.modulePath + '/' + files[i];
            
            if (fs.statSync(name).isDirectory()) {
                
                // get all configs
                var config = configService.getModuleConfig(files[i]);
                
                if(config !== null){
                    
                    // parse configs for routes
                    if(config.routes){
                        
                        for (var ii in config.routes) {
                            // set routes here
                            self.routes.push(config.routes[ii])
                        }
                    }
                }
            }
        }
    };

    self.getRoutes = function() {

        return self.routes;
    };

    self.buildMethodName = function(method) {

        return self.methodPrefix + method.charAt(0).toUpperCase() + method.slice(1);
    };

    self.buildRoute = function(route) {

        if (!route.id || !route.path || !route.controller) {

            return null;
        }

        if (!route.method) {

            route.method = 'get';
        }

        return route;

    };

    self.buildRoutes = function(server) {

        var key;
        var routes = self.getRoutes();
        var route;
        var controllerMethod;

        for (key in routes) {

            route = self.buildRoute(routes[key]);

            if (route === null) {

                console.log('RouteService: Invalid route defined.');
                continue;
            } else {

                controllerMethod = self.buildMethodName(route.method);
                if (route.version) {

                    server[route.method]({path: route.path, version: route.version}, route.controller[controllerMethod]);
                } else {
                    //var ev = 'server.'+route.method+'("'+route.path+'", route.controller.'+controllerMethod+')';
                    server[route.method](route.path, route.controller[controllerMethod]);
                }
            }
        }
    };

};

// Functions which will be available to external callers
module.exports = new RouteService();
