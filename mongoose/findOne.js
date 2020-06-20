//var method = require('../models/method.js');

module.exports = function find(mod, query, cb) {
  let model = require('../models/'+mod+'.js');
  model.findOne(query).exec( function (err, results) {
    if (err) throw err;
    cb(results);
    
  });
  
}