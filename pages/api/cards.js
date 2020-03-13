import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import config from '../../config.json';

const handler = nextConnect();
handler.use(middleware);

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = config["DB_URL"];
const dbName = 'pytte';
const colName = 'cards';

handler.get(async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);
    
        const { deck } = req.query;

        if (deck) {
            db.collection(colName).find({deckId: deck}).toArray().then((docs) => {
                res.json(docs);
                console.log("got all cards in database");
                console.log(docs);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                client.close();
            });
        } else {
            db.collection(colName).find({}).toArray().then((docs) => {
                res.json(docs);
                console.log("got all cards in database");
                //console.log(docs);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                client.close();
            });
        }
    });
});

handler.post(async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);

        let doc = req.body
        doc = JSON.parse(doc);
    
        db.collection(colName).insertOne(doc).then(() => {
            console.log('Card inserted!');
            //console.log(doc);
            res.json({message: 'ok'});
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            client.close();
        });
    });
})

export default (req, res) => handler.apply(req, res);