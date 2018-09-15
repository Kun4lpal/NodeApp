var monitorClass = require('./monitorModel');
var conn = require('../../mongo_connect');

//https://evdokimovm.github.io/javascript/nodejs/mongodb/expressjs/2016/07/17/Connect-Save-and-Find-Data-in-MongoDB-with-NodeJS-and-ExpressJS.html

exports.get = function(req,res){    
    res.sendFile(__dirname + "/monitor.html");    
};
