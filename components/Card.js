export default function Card(props) {
  /*
  constructor(props) {
    super(props);
    this.state = {isFlipped: false};
    this.handleClick = this.handleClick.bind(this);
  }

  function handleClick() {
    this.setState(state => ({
      isFlipped: !state.isFlipped
    }));
  }// + (this.state.isFlipped ? "flipped" : "")} onClick={this.handleClick}>
*/
  return (
    <div className="cardsContainer">
      <div className={"cards "}> 
        <div className="card front">
          <p>{props.front}</p>
        </div>
        <div className="card back">
          <p>{props.back}</p>
        </div>
      </div>
    </div>
  )
}

<style jsx>{`
.cardsContainer {
  perspective: 1500px;
  height: 250px;
  width: 250px;
  
}
.cards {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}
.card {
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  position: absolute;
} 
.flipped {
  transform: rotateY(180deg);
}
.front {
  background-color: white;
}
.back {
  background-color: white;
  transform: rotateY(180deg);
}
.card p {
  color: black;
}
`}</style>