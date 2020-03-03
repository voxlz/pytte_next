// Should know to what deck and what user through props
import defaultCard from  '../databaseSchema/cards.json';

class CardAdder extends React.Component {
    static async getInitialProps() {
        const res = await fetch('http://localhost:3000/api/decks');
        const data = await res.json();
        return { deck: data }
    }

    generateFields = () => {
        return (
            <div>
                <Field name={"Prompt"} />
                <Field name={"Answer"} />
            </div>
        )
    }

    addCardsToDeck = async () => {
        const card = defaultCard;
        card = card["hi"];

        const res = await fetch('http://localhost:3000/api/pytte', {
            method: 'post',
            body: JSON.stringify(card)
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Add cards to '{this.props.deck.name}' deck.</h1>
                    {this.generateFields()}
                    <button>Add Cards</button>
                </header>
            </div>
        )
    }
}

export default CardAdder;

class Field extends React.Component {
    render() {
        return (
            <div>
                <p>
                    {this.props.name}: 
                    <input type="textbox" />
                </p>
            </div>
        )
    }
}