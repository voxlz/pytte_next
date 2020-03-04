// Should know to what deck and what user through props
import defaultCard from  '../databaseSchema/cards.json';

class CardAdder extends React.Component {
    static async getInitialProps() {
        const [deckData, noteData] = await Promise.all([
            await fetch('http://localhost:3000/api/decks').then(r => r.json()),
            await fetch('http://localhost:3000/api/notes').then(r => r.json())
        ])

        return { deck: deckData, note: noteData }
    }

    generateFields = () => {
        return (
            <div className={"parent"}>
                <h2>Using template: {this.props.note.name}</h2>
                <div className={"container"}>
                    <div className={"fields box"}>
                        <h3>Fields:</h3>
                        <div className={"subbox"}>
                            {this.props.note.fields.map(
                                f => <Field name={f.name} />
                            )}
                        </div>
                    </div>
                    <div className={"relations box"}>
                        <h3>Relations:</h3>
                        <div className={"subbox"}>
                            {this.props.note.fields.map(
                                f => f.relations.map(
                                    r => <span>{f.name + " -> " + r}</span>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    div {
                        width: 100%;
                    }
                    h2 {
                        margin-left: 20px;
                    }
                    span {
                        display: block;
                    }
                    .parent {
                        background-color: black;
                        width: 100%;
                        max-width: 1000px;
                    }
                    .container {
                        display: flex;
                    }
                    .box {
                        height: 200px;
                        margin: 0 0 20px 50px;
                    }
                    .fields {
                        //background-color: green;
                        border-right-style: solid;
                    }
                    .relations {
                        //background-color: blue;
                    }
                `}</style>
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
                    <div id="box">
                        {this.generateFields()}
                    </div>
                    <button>Add Cards</button>
                </header>
                <style jsx>{`
                    .App {
                        width: 100%;
                    }
                    .App-header {
                        width: 100%;
                    }
                    #box {
                        background-color: green;
                        width: 100%;
                        justify-content: center;
                        align-items: center;
                    }
                `}</style>
            </div>
            
        )
    }
}

export default CardAdder;

class Field extends React.Component {
    render() {
        return (
            <div>
                <span>{this.props.name}: </span>
                <input type="textbox" />
            </div>
        )
    }
}