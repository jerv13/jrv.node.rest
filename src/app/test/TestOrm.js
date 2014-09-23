var TestModel = require('./TestModel.js');
var mongodbConfig = require('../_config/db.js');

var mongoose = require('mongoose');
var mongodbConfig = require('../_config/db.js');

console.log(mongodbConfig);
mongoose.connect(mongodbConfig.connect);

var db = mongoose.getConnections();
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

    console.log('connection success:');
    var TestOrm = mongoose.model('TestOrm', new TestModel);

    // Functions which will be available to external callers
    module.exports = TestOrm;
});


