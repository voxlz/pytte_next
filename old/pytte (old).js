//@ts-check
import nextConnect from 'next-connect';
import middleware from '../middleware/database';

const handler = nextConnect();
handler.use(middleware);

// Get's a single card, can't get it to work on multiple at the moment
handler.get(async (req, res) => {
  let doc = await req.db.collection('cards').findOne()
  if(doc == null) { doc = {'cards':{ 'card1':"hi" }} }
  res.json(doc)
});

/*handler.post(async (req, res) => {
  let data = JSON.parse(req.body);
  let doc = await req.db.collection('cards').updateOne({}, {$set:data}, {upsert: true})
  res.json({message: 'ok'});
})*/

export default (req, res) => handler.apply(req, res) 
