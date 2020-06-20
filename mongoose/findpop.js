const method = require('../models/method.js');
const variation = require('../models/variation.js');
const unmethod = require('../models/unmethod.js');

module.exports = function find(mod, query, cb) {
  let model = require('../models/'+mod+'.js');
  let q = query.query;
  let fields = query.fields;
  //let pop = require('../models/'+query.pop.coll+'.js');
  console.log(query);
  model.find(q, fields)
    .populate(query.pop.coll, query.pop.fields)
    .populate("variations", "title")
    .populate("unmethods", "title")
    .exec( function (err, results) {
    if (err) throw err;
    cb(results);
    
  });
}