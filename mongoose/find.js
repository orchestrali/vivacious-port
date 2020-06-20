//var method = require('../models/method.js');

module.exports = function find(mod, query, cb) {
  let model = require('../models/'+mod+'.js');
  
  model.find(query, function (err, results) {
    if (err) throw err;
    cb(results);
    
  })
}