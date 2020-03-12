import Card from "../../components/Card";
import fetch from "isomorphic-unfetch";

// The page where you are actually reviewing the cards

class Learn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      index: 0,
      cardToggle: false,
      cardQueue: this.shuffle(props.cards),
      curCard: { ...props.cards[0] }
      //lastCard: { ...props.cards[0] },
      //nextCard: { ...props.cards[1] }
    };
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  static async getInitialProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/cards?deck=${id}`);
    const data = await res.json();
    console.log("First card set");
    return { cards: data };
  }

  /**
   * Levels up the card and calculates new review time/date. Removes from queue.
   */
  rememberd = () => {
    var queue = this.state.cardQueue;
    queue.splice(this.state.index, 1)
    //this.setState({ curCard: { level: 0 } })
    this.getNextCard();
  };

  /**
   * Levels up the card and calculates new review time/date.
   */
  forgot = () => {
    this.getNextCard();
  };

  getNextCard = () => {
    const queueLength = this.state.cardQueue.length;
    const index = this.state.index;

    var nextIndex = index + 1;
    nextIndex = nextIndex >= queueLength ? 0 : nextIndex; // makes the index wrap around

    this.setState({
      cardToggle: !this.state.cardToggle,
      index: nextIndex,
      curCard: this.props.cards[nextIndex]
      //lastCard: this.props.cards[index],
      //nextCard: this.props.cards[nextNextIndex]
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Review cards (click to flip)</h1>
        <div id="cards">
          <div id="currentCard" className="reviewCard">
            {this.state.cardQueue.length != 0 ? 
            <Card
              front={this.state.curCard.frontText}
              back={this.state.curCard.backText}
            /> : <h3>No cards Left!</h3>
            }
          </div>
        </div>
        <div id="buttonBox">
          <button id="btnForgot" onClick={this.forgot}>
            Forgot
          </button>
          <button id="btnRememb" onClick={this.rememberd}>
            Remember
          </button>
        </div>
        <style jsx>{`
          
          #btnRememb {
            background-color: lightgreen;
          }
          #btnForgot {
            background-color: gray;
          }
          .reviewCard {
            left: 50vw;
            transform: translateX(-50%);
            transition: left 1s ease;
            position: relative;
          }
          button {
            width: 40%;
            height: 40px;
            margin: 10px;
            border: none;
          }
          #buttonBox {
            width: 50%;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
        
        `}</style>
      </div>
    );
  }
}

export default Learn;
