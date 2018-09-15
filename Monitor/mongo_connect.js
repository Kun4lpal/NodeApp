// "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
// "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
// instead of creating a new connection for each request, I create just one connection here. 
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var conn = mongoose.createConnection("mongodb://localhost:27017");

module.exports = exports = conn;

