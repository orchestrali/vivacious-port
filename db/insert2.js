const close = require('./close.js');


module.exports = function insert(collection, data, db) {
    collection.insertMany(data, function(err, result) {
      if(err) throw err;
      console.log('data inserted');
      
      close(db);
    });
}