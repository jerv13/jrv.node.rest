var configService = require('./configService.js');
var routeService = require('./routeService.js');

var appConfig = configService.getModuleConfig('');
var restify = require('restify');
var Logger = require('bunyan');

var log = new Logger({
  name: appConfig.server.name,
  streams: appConfig.log.streams,
  serializers: {
    req: Logger.stdSerializers.req,
    res: Logger.stdSerializers.res
  }
});

var serverOptions = {
    //certificate: '',
    //key: '',
    //formatters: {},
    log: log,
    name: appConfig.server.name,
    //spdy: {},
    version: appConfig.server.version
    //responseTimeHeader: ''
    //responseTimeFormatter: {}
};

var server = restify.createServer(serverOptions);
server.use(restify.bodyParser());

server.pre(function (request, response, next) {
  //request.log.info({req: request}, 'start');        // (1)
  return next();
});

routeService.buildRoutesFromConfig(configService);
routeService.buildRoutes(server);

server.listen(appConfig.server.port, appConfig.server.host, function() {
    console.log('%s listening at %s ', server.name, server.url);
});