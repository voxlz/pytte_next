import nextConnect from 'next-connect';
import config from '../config.json';

const url = config["DB_URL"];

const client = require('mongodb').MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('pytte');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;