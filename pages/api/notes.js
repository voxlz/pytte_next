import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import config from '../../config.json';

const handler = nextConnect();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = config["DB_URL"];
const dbName = 'pytte';
const colName = 'notes';

handler.use(middleware);

handler.get(async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);
    
        db.collection(colName).findOne().then((doc) => {
            res.json(doc);
            console.log("Fetched a note");
            console.log(doc);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            client.close();
        });
    });
});

// Update deck
handler.post(async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);

        let doc = req.body
        doc = JSON.parse(doc);
    
        db.collection(colName).updateOne({"_id": doc[_id]}, doc).then((doc) => {
            console.log('Note Updated!');
            res.json({message: 'ok'});
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            client.close();
        });
    });
})

export default (req, res) => handler.apply(req, res);