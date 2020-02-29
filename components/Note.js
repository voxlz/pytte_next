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

export default Note