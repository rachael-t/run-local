import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Landing from '../Landing/Landing'

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Run Local</h1>
        </header>
        <main>
          <Route exact path="/" render={() => <Landing />}/>
        </main>
      </div>
    );
  }
}

export default App;
