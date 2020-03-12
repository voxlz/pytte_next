class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFlipped: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isFlipped: !state.isFlipped
    }));
  }
  
  render() {
    return (
      <div className="cardsContainer">
        <div className={"cards " + (this.state.isFlipped ? "flipped" : "")} onClick={this.handleClick}>
          <div className="card" id="front">
            <span>(Translate)</span>
            <p>{this.props.front}</p>
          </div>
          <div className="card" id="back">
            <p>{this.props.back}</p>
          </div>
        </div>
        <style jsx>{`
          .cardsContainer {
            perspective: 1500px;
            perspective-origin: center;
          }

          .cards {
            height: 250px;
            width: 350px;
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
            margin: 10px;
            //box-shadow: -10px 10px gray;
          }

          .card {
            background-color: white;
            height: 100%;
            width: 100%;
            border-radius: 20px;
            border-style: solid;
            border-color: gray;
            border-width: 2px;
            position: absolute;
            background-color: white;
            box-sizing: border-box;
          } 

          .flipped {
            transform: rotateY(180deg);
          }

          #back {
            transform: rotateY(180deg);
            //border-width: 2px 4px 4px 2px;
          }

          #shadow {
            height: 250px;
            width: 350px;
            background-color: red;
            z-index: -1;
            y: 10px;
          }

          .card p {
            color: black;
            font-size: calc(10px + 2vmin);
            text-align: center;
          }

          span {
            color: black;
          }
        `}</style>
      </div>
    );
  }
}

export default Card