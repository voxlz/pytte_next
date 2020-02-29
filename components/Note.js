import Card from './Card.js';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      front: '',
      back: ''
    }
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  insertCardIntoDb = (event) => {
    var MongoClient = require('mongodb').MongoClient;
    var dbName = "pytte";
    var collectionName = "cards";
    var url = "mongodb+srv://voxlse:JPqFU6hlVye1dEUQ@firstcluster-odi0h.mongodb.net/test?retryWrites=true&w=majority";

    var card = { 
      userId: "",  
      deckId: "", 
      noteId: "", 
      front: "bruh", 
      back: "nuh2",
      dependencies: "",
      conflicts: ""
    };

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo.collection(collectionName).insertOne(card, function(err, res) {
        if (err) throw err;
        console.log("1 card inserted");
        db.close();
      });
    });
  }

  render() {
    return (
      <div className="noteContainer">
        <h1>Create new note:</h1>
        <form>
            <p>Front:</p>
            <input type="text" name='front' onChange={this.myChangeHandler}/>
            <p>Back:</p>
            <input type="text" name='back' onChange={this.myChangeHandler}/>
        </form>

        <h2>This note will generate these cards:</h2>
        <Card front={this.state.front} back={this.state.back}/>
        <button onClick={this.insertCardIntoDb}>Save Card</button>
      </div>
    );
  }
}

Note.getInitialProps = async function() {
  
}

export default Note