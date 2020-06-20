const find = require('../mongoose/findpop.js');
const layout = require('./layout.js');

module.exports = function getrecords(start, end, cb) {
  let q = {
    query: {bbNum: {$gt: Number(start)-1, $lt: Number(end)+1}},
    fields: "titleFull details date methods variations unmethods bbNum",
    pop: {coll: "methods", fields: "title ccNum"}
  }
  find("bbperformance", q, (arr) => {
    cb(layout(arr));
  });
  
}