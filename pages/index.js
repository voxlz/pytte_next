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
    console.log(data);
    return {
      cards: data
    }
  }
  
  setCard = () => {}
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Note />
        </header>
        <button value={"Update"} onClick={this.getCards}/>
        <h1>Cards in terwfdtgfgd:</h1>
        <div>
          {this.props.cards.map(entry => 
            <Card front={entry.front} back={entry.back}/>
          )}
        </div>
      </div>
    )
  }
}

export default Home;