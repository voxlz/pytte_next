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
            console.log(docs);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            client.close();
        });
    });
});

export default (req, res) => handler.apply(req, res);