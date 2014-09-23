var configService = require('../../configService.js');
var dbConfig = configService.getModuleConfig('_db');
var mongoClient = require('mongodb').MongoClient;

var MongoDbo = function() {
    
    self = this;
    
    self.connect = function(callback){
        
        mongoClient.connect(dbConfig.db.mongo.connect, function(err, db){});
    }
    
    self.create = function(obj, callback){
        
        // check if exists
        
        // create
    };
    
    self.read = function(obj, callback){
        
        
        // read
    };
    
    self.update = function(obj, callback){
        
    };
    
    self.del = function(obj, callback){
        
    };
};


module.exports = MongoDbo;