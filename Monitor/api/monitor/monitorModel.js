var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = require('../../mongo_connect');


var db = conn.useDb('monitors');

var monitorSchema = new mongoose.Schema({    
    company: String,
    monitortype: String
});

var monitorModel = db.model('monitors',monitorSchema,'monitors');

module.exports = exports = monitorModel;