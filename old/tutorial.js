// ---- FUNCTIONS ----
const Example = (props) => {
    return <div />;
  }
  //is equivalent to:
  function Example(props) {
    return <div />;
  }
  
  // ---- STATE ----
  class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }
  // Is equivivalent to:
  import React, { useState } from 'react';
  
  function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0); // 0 is initial value
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  
  /*
  <Modal {...this.props} title='Modal heading' animation={false} />
  // EQUALS
  <Modal a={this.props.a} b={this.props.b} title='Modal heading' animation={false} />
  */