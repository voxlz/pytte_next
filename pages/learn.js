import Card from "../components/Card";

// The page where you are actually reviewing the cards

class Learn extends React.Component {
    constructor(props) {
        super();
        this.state = {
            index: 0,
            cardQueue: props.cards,
            curCard: {... props.cards[0]}
        };
    }

    static async getInitialProps() {
        const res = await fetch('http://localhost:3000/api/pytte');
        const data = await res.json();
        console.log("First card set");
        return { cards: data }
    }

    /**
     * Levels up the card and calculates new review time/date. Removes from queue.
     */
    rescheduleCard = () => {
        this.setState({curCard: {level: 0}})
        this.getNextCard();
    }

        /**
     * Levels up the card and calculates new review time/date.
     */
    requeueCard = () => {
        this.getNextCard
    }
    
    getNextCard = () => {
        var nextIndex = this.state.index + 1;
        const queueLength = this.state.cardQueue.length;

        // makes the index wrap around
        nextIndex = nextIndex >= queueLength ? 0 : nextIndex;
        this.setState({index: nextIndex})
        this.setState({curCard: this.props.cards[nextIndex]});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Review cards</h1>
                    <Card front={this.state.curCard.front} back={this.state.curCard.back}/>
                    <button onClick={this.requeueCard}>Forgot</button>
                    <button onClick={this.rescheduleCard}>
                        Remember (Review in x days)
                    </button>
                </header>
            </div>
        )
    }
}

export default Learn;