const MongoClient = require('mongodb').MongoClient;


module.exports = function connect(uri, dbName, coll, f, data) {
  let client = new MongoClient(uri, { useNewUrlParser: true });
  
  client.connect(function(err, db) {
    if(err) throw err;
    
    let collection = client.db(dbName).collection(coll);
    let fx = require('./'+f+'.js');
    
    fx(collection, data, db);
    
  }); 
}