var GenResponse = require('../_core/GenResponse.js');
var BasicResponse = require('../_core/BasicResponse.js');
var configService = require('../../configService.js');
var UserModel = require('./UserModel.js');
var UserValidation = require('./UserValidation');

var dbConfig = configService.getModuleConfig('_db');
var MongoClient = require('mongodb').MongoClient;

var UserController = function() {

    var self = this;

    self.actionPost = function(req, res, next) {

        var user = new UserModel();
        
        // @todo write idUserCreateBy, will require user session, 
        // this will determine the status of the new account
        // an account created by another will send email to the email of the user to be created 
        // and needs to be claimable by the owner
        // owner may clain an account by
        user.idUserCreateBy = 0; 
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;


        var userValidation = new UserValidation();
        userValidation.obj = user;

        if (!userValidation.isValid()) {


        }

        MongoClient.connect(dbConfig.db.mongo.connect, function(err, db) {

            if (err) {

                tRes.code = 400;
                tRes.message = 'Error CONNECT';
                tRes.data = err;
                res.send(tRes);
                return next();
            } else {


            }
        }
        );
        // check if user exists
        // if not exists create
        // if exists check for valid object model
        // if valid

        //console.log(req.body);
        var tRes = new GenResponse();
        tRes.code = 200;
        tRes.message = 'Post OK';
        tRes.data = req.body;
        res.send(tRes);
        return next();
    };

    self.getValidDateStr = function(dateStr) {

        // @todo
    };
};

module.exports = new UserController();
