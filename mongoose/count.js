

module.exports = function find(mod, query, cb) {
  let model = require('../models/'+mod+'.js');
  
  model.countDocuments(query, function (err, results) {
    if (err) cb(err);
    //console.log("num documents", results);
    cb(results.toString());
    
  })
}