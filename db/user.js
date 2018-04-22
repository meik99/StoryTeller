const params = require("./dbparameter");
const MongoClient = require("mongodb").MongoClient;

module.exports = {
  findOrCreate: function(profileId, callback){
    MongoClient.connect(params.url, function(err, client){
      const db = client.db(params.dbname);

      db.collection("user").findOne({profileId: profileId}, function(err, result){
        if(err) throw err;

        if(result != null){
          callback(result);
        }else{
          db.collection("user").insertOne({profileId: profileId}, function(err, result){
            if(err) throw err;
            callback(result.ops[0]);
          });
        }
      });
    });
  }
};
