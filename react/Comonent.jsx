import React from "react";

const ThemeContext = React.createContext("light");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      inputVal: "",
      list: ["a", "b", "c", "d", "e"],
      theme: "dark",
    };
    this.appRef = React.createRef();
  }

  static defaultProps = {
    theme: "red",
  };

  componentDidMount() {
    console.log(this.appRef.current);
  }

  handleClick = (type) => {
    if (type === 1) {
      this.setState({ counter: this.state.counter - 1 });
    }

    if (type === 0) {
      this.setState({ counter: this.state.counter + 1 });
    }
    this.setState({
      inputVal: "hello world",
    });
  };

  handleChange = (e) => {
    this.setState({
      inputVal: event.target.value,
    });
  };

  handleChangeSort = () => {
    this.setState({
      list: ["a", "b", "e", "c", "x", "y"],
    });
  };

  handleChangeThemeContext = () => {
    this.setState({
      theme: "gray",
    });
  };

  render() {
    return (
      // <div className="App" ref={this.appRef}>
      //   <header className="App-header">
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      <>
        <button onClick={this.handleChangeSort}>change sort</button>
        <div className="sort">
          {this.state.list.map((val, index) => (
            <p key={index}>{val}</p>
          ))}
        </div>
        </>
      //   <ThemeContext.Provider value={this.state.theme}>
      //     <ChildComponent />
      //   </ThemeContext.Provider>
      //   <ChildHookComponent />
      //   <button onClick={this.handleChangeThemeContext}>change context</button>
      //   <div className="App-intro">
      //     <div className="button-container">
      //       <button
      //         className="decrement-button"
      //         onClick={() => this.handleClick(1)}
      //       >
      //         plus
      //       </button>
      //       <div className="counter-text">{this.state.counter}</div>
      //       <button
      //         className="increment-button"
      //         onClick={() => this.handleClick(0)}
      //       >
      //         subtract
      //       </button>
      //     </div>
      //   </div>
      //   <input
      //     type="text"
      //     value={this.state.inputVal}
      //     onChange={this.handleChange}
      //   />
      //   {this.state.inputVal}
      // </div>
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
      <ThemeContext.Consumer>
        {(data) => <div>{`themecolor:${data}`}</div>}
      </ThemeContext.Consumer>
    </div>
  );
}

function ChildHookComponent() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("cause effect");
    return () => {
      console.log("cancel sub");
    };
  }, []);

  React.useLayoutEffect(() => {
    console.log("cause layout effect");
  }, []);

  return (
    <React.Fragment>
      <h1>hooks</h1>
      {count}
      <div onClick={() => setCount((data) => data + 1)}>+</div>
    </React.Fragment>
  );
}

export { App };
