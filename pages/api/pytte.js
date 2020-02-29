//@ts-check
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();
handler.use(middleware);

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb+srv://voxlse:JPqFU6hlVye1dEUQ@firstcluster-odi0h.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'pytte';
const colName = 'cards';

handler.get(async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);
    
        db.collection(colName).find({}).toArray().then((docs) => {
            res.json(docs);
            console.log("got all cards in database");
            console.log(docs);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            client.close();
        });
    });
});

handler.post(async (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);

        let doc = req.body
        doc = JSON.parse(doc);
    
        db.collection(colName).insertOne(doc).then((doc) => {
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