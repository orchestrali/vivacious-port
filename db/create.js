const close = require('./close.js');

module.exports = function create(coll, data, db) {
  let mod = require('../models/method.js');
  //console.log(mod.length);
  
  for (var i = 0; i < data.length; i++) {
    mod.create(data[i], function (err, res) {
      if (err) throw err;
      console.log(res.complib);
    });
  }
  
  close(db);
}