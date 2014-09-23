var GenResponse = require('../_core/GenResponse.js');
var BasicResponse = require('../_core/BasicResponse.js');
var configService = require('../../configService.js');
var dbConfig = configService.getModuleConfig('_db');

var TestController = function() {

    var self = this;
    
    self.actionPut = function(req, res, next) {
        
        var tRes = new GenResponse();
        tRes.code = 200;
        tRes.message = 'Put OK';
        tRes.data = "Hi " + req.body;
        res.send(tRes);
        return next();
    };
    
    self.actionDel = function(req, res, next) {
        
        var tRes = new GenResponse();
        tRes.code = 200;
        tRes.message = 'Delete OK';
        tRes.data = "Hi " + req.params.name;
        res.send(tRes);
        return next();
    };
    
    self.actionPost = function(req, res, next) {
        
        var tRes = new GenResponse();
        tRes.code = 200;
        tRes.message = 'POST OK';
        tRes.data = "Hi " + req.params.name;
        res.send(tRes);
        return next();
    };

    self.actionGet = function(req, res, next) {

        var MongoClient = require('mongodb').MongoClient;

        MongoClient.connect(dbConfig.db.mongo.connect, function(err, db) {

            var tRes = new GenResponse();

            if (err) {

                tRes.code = 400;
                tRes.message = 'Error CONNECT';
                tRes.data = err;
                res.send(tRes);
                return next();
            } else {

                db.collectionNames(function(err, collections) {

                    tRes.code = 200;
                    tRes.message = 'collections';
                    tRes.data = collections;
                    console.log(collections);
                    res.send(tRes);
                    return next();

                    if (!collections['test']) {

                        db.createCollection("test", function(err, collection) {
                            var col = {
                                err: err,
                                collections: collection
                            };
                            tRes.code = 200;
                            tRes.message = 'test create';
                            tRes.data = col;
                            res.send(tRes);
                            return next();
                        });
                    } else {

                        var cols = {
                            err: err,
                            collections: collections
                        };
                        tRes.code = 200;
                        tRes.message = 'collections';
                        tRes.data = cols;
                        res.send(tRes);
                        return next();
                    }
                });
            }


            /*
             tRes.err = err;
             tRes.db = db;
             tRes.result = db.find({}, function(){
             res.send(tRes);
             return next();
             });
             
             /*db.collection("replicaset_mongo_client_collection").update({a: 1}, {b: 1}, {upsert: true}, function(err, result) {
             test.equal(null, err);
             test.equal(1, result);
             
             db.close();
             test.done();
             });*/
        });

        /*
         
         var TestOrm = require('./TestOrm.js');
         
         var testOrm = new TestOrm({name: req.params.name, message: ''});
         
         console.log('TestController: 1');
         
         TestOrm.find({}, function(err, tests) {
         console.log('TestController: 11');
         if (err) {
         console.log('TestController: 2');
         var bRes = new GenResponse();
         bRes.code = 500;
         bRes.message = 'ERROR: Could not save TestOrm';
         bRes.data = err;
         console.log('ERROR: Could not save TestOrm');
         res.send(bRes);
         return next(err);
         } else {
         console.log('TestController:3');
         var gRes = new GenResponse();
         
         gRes.code = 200;
         gRes.message = 'List success';
         gRes.data = tests;
         req.log.info(gRes);
         res.send(gRes);
         return next();
         }
         });
         */
        /*
         testOrm.save(function(err) {
         if (err) {
         var bRes = new GenResponse();
         bRes.code = 200;
         bRes.message = 'ERROR: Could not save TestOrm';
         bRes.data = err;
         console.log('ERROR: Could not save TestOrm');
         return next();
         }
         });
         */

        /*
         var gRes = new GenResponse();
         
         gRes.code = 200;
         gRes.message = 'someMessage';
         gRes.data = testOrm;
         req.log.info(gRes);
         res.send(gRes);
         */
        //console.log('TestController: 4');
        //return next();
    };
};

module.exports = new TestController;
