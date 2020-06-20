

module.exports = function create(arr, model) {
  let mod = require('../models/'+model+'.js');
  //console.log(mod.length);
  
  for (var i = 0; i < arr.length; i++) {
    mod.create(arr[i], function (err, res) {
      if (err) throw err;
      console.log(res.complib);
    });
  }
  
}