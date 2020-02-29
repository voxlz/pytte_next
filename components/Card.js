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
          <div className="card front">
            <p>{this.props.front}</p>
          </div>
          <div className="card back">
            <p>{this.props.back}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card