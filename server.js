/*
 * Copyright (c) 2016 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Written with: mongodb@2.1.3
 * Documentation: http://mongodb.github.io/node-mongodb-native/
 * A Node script connecting to a MongoDB database given a MongoDB Connection URI.
*/

// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const connect = require('./mongoose/connect.js');
const find = require('./mongoose/find.js');
const findOne = require('./mongoose/findOne.js');
const findFields = require('./mongoose/findFields.js');
const count = require('./mongoose/count.js');
const findpop = require('./mongoose/findpop.js');
const gettable = require('./display/get.js');
const gettable2 = require('./display/get2.js');
const words = require('./words/router.js');
const aggregate = require('./mongoose/aggregate.js');

var app = express();
var dbSongs="";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
// Create seed data
var seedData = require('./seedData.js');

// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
var uri = 'mongodb+srv://'+process.env.USER2+':'+process.env.PASS2+'@'+process.env.PORT+'/'+process.env.DB+'?retryWrites=true';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true });

// Database Name
const dbName = process.env.DB;

var test = {
  ccNum: 10460,
  title: 'Plain Bob Minimus',
  name: 'Plain',
  stage: 4,
  pn: '-14-14,12',
  pnFull: ['x',[1,4],'x',[1,4],'x',[1,4],'x',[1,2]],
  leadHead: '1342'
}
var example = require('./example.js');


let connection = connect(uri, dbName);

var query = {
  query: {bbNum: 115},
  fields: "titleFull date methods variations",
  pop: {coll: "methods", fields: "title"}
};

var q = {
  numHunts: 4,
  stage: 8
}

var arr = [
  {$lookup: {from: "bbtexts", let: {mtitle: "$title"}, pipeline: [{$match: {methods: {$exists: true}, $expr: {$and: [{$in: ["$$mtitle", "$methods"]}, {$eq: [{$toInt: {$substrCP: ["$date", 0, 4]}}, 2001]}]}}}], as: "perfs"}},
  {$match: {$expr: {$gt: [{$size: "$perfs"}, 0]}}}
]

//aggregate("method", arr, (res) => console.log(res.length));
//findpop("bbperformance", query, (res) => console.log(res[0]));
//count("method", q, (res) => console.log(res));

//connection.close();

//findFields("method", {query: q, fields: "title huntBells"}, (res) => console.log(res));
//words(3);
//

app.get("/", function (request, response) {
  //console.log(request.query);
  response.sendFile(__dirname + '/views/blank.html');
});

app.get("/worddata", function (request, response) {
  response.sendFile(__dirname + '/views/worddata.html');
});

app.get("/graph", function (request, response) {
  response.sendFile(__dirname + '/views/graphs.html');
});

app.post("/agg", function (request, response) {
  console.log(request.body.arr[0]);
  if (request.body.mod) {
    aggregate(request.body.mod, request.body.arr, (res) => {
      response.send(res);
    });
  } 
  
});

app.get("/table", function (req, response) {
  console.log(req.query);
  let start = req.query ? req.query.start : 1;
  let end = req.query ? req.query.end : 5;
  gettable(req.query.start, req.query.end, (table) => {
    response.send(table);
  });
});

app.get("/bbperfs", function (req, response) {
  console.log(req.query);
  let start = req.query ? req.query.start : 1;
  let end = req.query ? req.query.end : 5;
  gettable2(req.query.start, req.query.end, (table) => {
    response.send(table);
  });
});

app.get("/methods", function (req, response) {
  //response.send('ok');
  find('method', req.query, (result) => {
    response.send(result);
    //connection.close();
  });
});

app.get("/method", function (req, response) {
  console.log(req.query);
  findOne('method', req.query, (result) => {response.send(result)});
});

app.post("/methods", function (req, response) {
  console.log(req.body);
  findFields('method', req.body, (result) => {response.send(result)});
  //connection.close();
});

app.get("/performances", function (req, response) {
  //response.send('ok');
  find('performance', req.query, (result) => {response.send(result)});
});

app.get("/performance", function (req, response) {
  findOne('performance', req.query, (result) => {response.send(result)});
});

app.get("/oldPerformances", function (req, response) {
  //response.send('ok');
  find('oldPerformance', req.query, (result) => {response.send(result)});
});

app.get("/oldPerformance", function (req, response) {
  findOne('oldPerformance', req.query, (result) => {response.send(result)});
});

const models = ["method", "performance", "oldPerformance", "name", "bbperformance", "unmethod", "variation", "call", "cycle", "leadhead", "methodab", "doublescall", "word", "bbtext"];

app.get("/find/:model", function (req, res) {
  let mod = req.params.model;
  console.log(req.query);
  if (models.indexOf(mod) > -1) {
    //res.send("find one");
    findOne(mod, req.query, (result) => res.send(result));
  } else if (models.indexOf(mod.slice(0, -1)) > -1) {
    //res.send("find many");
    find(mod.slice(0, -1), req.query, (result) => res.send(result));
  } else {
    res.send("no such model exists");
  }
});

app.post("/find/:model", function (req, res) {
  let mod = req.params.model;
  
});

app.get("/count/:model", function (req, res) {
  let mod = req.params.model;
  if (models.indexOf(mod) > -1) {
    count(mod, req.query, (num) => res.send(num));
  } else {
    res.send("no such model exists");
  }
});

// listen for requests :)
var listener = app.listen("3000", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
