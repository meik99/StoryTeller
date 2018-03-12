const dbparamter = require("./dbparameter");
const MongoClient = require("mongodb").MongoClient;

class MessageDAO {

    constructor() {
    }

    connect(fn) {
        MongoClient.connect(
            dbparamter.url,
        ).then((client) => {
            fn(client.db(dbparamter.dbname));
        });
    }

    insert(title, messages, cb) {
        this.connect(function (db) {
            db.collection("messages")
                .insertOne({title: title, messages: messages}, (err, result) => {
                    if (err) console.log(err);
                    cb(result.ops[0]);
                });
        });
    }

    select(cb) {
        this.connect((db) => {
            db.collection("messages")
                .find({}, (err, result) => {
                    if (err) console.log(err);
                    cb(result);
                });
        });
    }
}

module.exports = MessageDAO;