import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      inputVal: "",
    };
  }

  handleClick = (type) => {
    console.log(type);
    if (type === 1) {
      this.setState({ counter: this.state.counter - 1 });
    }

    if (type === 0) {
      this.setState({ counter: this.state.counter + 1 });
    }
  };

  handleChange = (e) => {
    console.log(e);
    this.setState({
      inputVal: event.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ChildComponent />
        <p className="App-intro">
          <div className="button-container">
            <button
              className="decrement-button"
              onClick={() => this.handleClick(1)}
            >
              plus
            </button>
            <div className="counter-text">{this.state.counter}</div>
            <button
              className="increment-button"
              onClick={() => this.handleClick(0)}
            >
              subtract
            </button>
          </div>
        </p>
        <input
          type="text"
          value={this.state.inputVal}
          onKeyDown={this.handleChange}
        />
        {this.state.inputVal}
      </div>
    );
  }
}

function ChildComponent() {
  return (
    <div className="childcom">
      <h2>hello child</h2>
      <a href="http://www.baidu.com/" className="href">
        链接
      </a>
    </div>
  );
}

export { App };
