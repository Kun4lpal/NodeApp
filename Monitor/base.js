/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main : base.js
// Author : Kunal Paliwal
// MONGO DB SETUP
// "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
// "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
// https://www.html5webtemplates.co.uk/templates.html
//https://evdokimovm.github.io/javascript/nodejs/2016/06/13/NodeJS-How-to-Use-Functions-from-Another-File-using-module-exports.html
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var cors = require('cors')
var app = express();
var todos = ["Test"];
// routes definition
var monitorRouter = require('./api/monitor/monitorRoute');


//middle ware (this is run first)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + '/public')));
// routing
app.use('/monitor',monitorRouter);

// Middleware => Backbone of express, a series of callback which allow us to build our api
// it has req obj, response obj.
// has to call next() otherwise it will hang
// all these routes are middlewares, they have a next function
app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.get('/test',function(req,res){
    res.status(200).send("True");
});
app.listen(3003);