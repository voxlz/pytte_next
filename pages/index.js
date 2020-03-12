import fetch from 'isomorphic-unfetch'
import Link from 'next/link';

class Home extends React.Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/api/decks');
    const data = await res.json();
    return { decks: data }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div id="contents">
          <h1>Welcome to Pytte, a flashcard App!</h1>
          <div>
            <h2>List of all decks:</h2>
            {this.props.decks.map(entry => 
              <Deck id={entry._id} name={entry.name}/>
            )}
          </div>
          <div id="links">
            <Link href="add">
              <a title="Add Page">Add Page</a>
            </Link>
          </div>
        </div>
        <style jsx>{`
          a {
            margin: 15px;
          }
        `}</style>
      </div>
    )
  }
}

class Deck extends React.Component {
  render() {
    return(
      <div id="deck">
        <h3>{this.props.name}</h3>
        <Link href={"/d/[id]"} as={`/d/${this.props.id}`}>
          <input type="button" value="Review"/>
        </Link>
        <style jsx>{`
          #deck {
            display: flex;
            align-items: center;
            justify-content: left;          
          }
          input {
            margin-left: 20px;
            height: 25px;
          }
        `}</style>
      </div>
    )
  }
}

export default Home;