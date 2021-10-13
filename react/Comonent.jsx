import React from "react";

const ThemeContext = React.createContext('light');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      inputVal: "",
    };
    this.appRef = React.createRef()
  }

  static defaultProps = {
    theme: 'red'
  }

  componentDidMount() {
    console.log(this.appRef.current)
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
      <div className="App" ref={this.appRef}>
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
