import Note from '../components/Note.js'
import React, { useState } from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.getCards = this.getCards.bind(this);
    this.setCard = this.setCard.bind(this);
  }

  getCards() {
    
  }

  setCard() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Note />
        </header>
        <button value={"Update"} onClick={this.getCards}/>
        <h1>Cards in database:</h1>
      </div>
    )
  }
}

export default Home;