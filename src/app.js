var configService = require('./configService.js');
var routeService = require('./routeService.js');

var serverConfig = configService.getConfig('server');
var logConfig = configService.getConfig('log');
var restify = require('restify');
var Logger = require('bunyan');

var log = new Logger({
  name: serverConfig.name,
  streams: logConfig.streams,
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
    name: serverConfig.name,
    //spdy: {},
    version: serverConfig.version
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

server.listen(serverConfig.port, serverConfig.host, function() {
    console.log('%s listening at %s ', server.name, server.url);
});