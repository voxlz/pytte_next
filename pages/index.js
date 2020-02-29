import fetch from 'isomorphic-unfetch'
import Card from "../components/Card";
import Note from '../components/Note.js'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {message: 'Hello!'};
  }

  static async getInitialProps(ctx) {
    const res = await fetch('http://localhost:3000/api/pytte');
    const data = await res.json();
    return { cards: data }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Note />
        </header>
        <h1>Cards in database:</h1>
        <div className={"cardsContainer"}>
          {this.props.cards.map(entry => 
            <Card front={entry.front} back={entry.back}/>
          )}
        </div>
      </div>
    )
  }
}

export default Home;