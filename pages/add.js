import defaultCard from "../databaseSchema/cards.json"; // Should know to what deck and what user through props

class Add extends React.Component {
  constructor(props) {
    super(props);

    var fields = [];
    fields.length = {...props.templates[0]}.fields.length

    this.state = {
      template: {...props.templates[0]},
      deck: {...props.decks[0]},
      fields: fields
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  static async getInitialProps() {
    const [deckData, noteData] = await Promise.all([
      await fetch("http://localhost:3000/api/decks").then(r => r.json()),
      await fetch("http://localhost:3000/api/templates").then(r => r.json())
    ]);
    return { decks: deckData, templates: noteData };
  }

  handleChange(event) {
    this.setState({
      template: {...this.props.templates.find(e => e.name == event.target.value)},
      decks: {...this.props.decks.find(e => e.name == event.target.value)}
    });
  }

  handleFieldChange(event) {
    var fields = this.state.fields;
    //alert(fields + " " + event.target.name + " " + event.target.value)
    fields[parseInt(event.target.name)] = event.target.value;
    this.setState({
      fields: fields
    })
  }
  
  async handleSubmit(event) {
    event.preventDefault();

    const target = event.target;
    var counter = 0;

    for (let i = 0; i < this.state.template.fields.length; i++) {
      const field = this.state.template.fields[i];
      
      for (let j = 0; j < field.relations.length; j++) {
        const relation = field.relations[j];
        
        const card = defaultCard;
        card["frontText"] = this.state.fields[i];
        card["backText"] = this.state.fields[this.state.template.fields.findIndex(r => r.name == relation)]
        card["dateCreated"] = new Date();
        card["dateNextRev"] = new Date();
        card["reviews"] = [];
        card["deckId"] = this.state.deck._id;
        //alert(card["frontText"] + " " + card["backText"] + " " + card["dateCreated"]);

        const res = await fetch("http://localhost:3000/api/cards", {
          method: "post",
          body: JSON.stringify(card)
        });
        counter++;
      }
    }

    alert(counter + ' cards where added!');
  }

  generateFields = () => {
    var fieldCounter = 0;

    return (
      <div className={"parent"}>
        <h2>Using template: {this.state.template.name}</h2>
        <div className={"container"}>
          <div className={"fields box"}>
            <h3>Fields:</h3>
            <div className={"subbox"}>
              {this.state.template.fields.map(field => (
                <label>
                  {field.name}: 
                  <input type="textbox" name={fieldCounter++} onChange={this.handleFieldChange}/>
                  <br></br>
                </label>
              ))}
            </div>
          </div>
          <div className={"relations box"}>
            <h3>Relations:</h3>
            <div className={"subbox"}>
              {this.state.template.fields.map(f =>
                f.relations.map(r => <span>{f.name + " → " + r}</span>)
              )}
            </div>
          </div>
        </div>
        <style jsx>{`
          div {
            width: 100%;
          }
          h2 {
            margin-left: 20px;
          }
          span {
            display: block;
          }
          .parent {
            background-color: gray;
            width: 100%;
            max-width: 1000px;            
          }
          .container {
            display: flex;
          }
          .box {
            height: 200px;
            margin: 0 0 20px 50px;
          }
          .fields {
            border-right-style: solid;
          }
          .relations {
          }
        `}</style>
      </div>
    );
  };

  addCards = async () => {

  };

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <label>
          Pick template:
          <select value={this.state.template.name} onChange={this.handleChange}>
            {this.props.templates.map(temp => <option value={temp.name}>{temp.name}</option>)}
          </select>
        </label>
        <label>
          Pick deck:
          <select value={this.state.deck.name} onChange={this.handleChange}>
            {this.props.decks.map(deck => <option value={deck.name}>{deck.name}</option>)}
          </select>
        </label>
        <h1>Add cards to {this.state.deck.name} deck.</h1>
        <div id="box">
          <form onSubmit={this.handleSubmit}>
            {this.generateFields()}
            <input type="submit" value="Add cards"/>
          </form>
        </div>
        <style jsx>{`
          html {
            text-align: left;
          }
          .App {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-flow: column;
          }
          .App-header {
            width: 100%;
          }
          #box {
            //background-color: green;
            width: 100%;

          }
        `}</style>
      </div>
    );
  }
}

export default Add;