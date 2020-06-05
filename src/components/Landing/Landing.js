import React, { Component } from "react";
import "./Landing.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="landing-container">
        <form>
          <h2>Welcome!</h2>
          <p>Please select a city:</p>
          <select>
            <option>Arvada</option>
            <option>Broomfield</option>
            <option>Lafayette</option>
            <option>Louisville</option>
            <option>Superior</option>
            <option>Westminster</option>
          </select>
          <button>Find Trails</button>
        </form>
      </div>
    );
  }
}

export default Landing;
