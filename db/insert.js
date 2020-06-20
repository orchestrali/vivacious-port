const MongoClient = require('mongodb').MongoClient;


module.exports = function connect(uri, dbName, coll, data) {
  let client = new MongoClient(uri, { useNewUrlParser: true });
  
  client.connect(function(err, db) {
    if(err) throw err;
    
    let collection = client.db(dbName).collection(coll);
    
    collection.insertMany(data, function(err, result) {
      if(err) throw err;
      console.log('data inserted');
      
      db.close(function (err) {
        if (err) throw err;
      })
    });
  }); 
}