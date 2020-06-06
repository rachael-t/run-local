import React, { Component } from "react";
import "./Sidebar.css";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super();
    this.state = {
        city: '',
        errorMessage: '',
    };
  }

  handleSelection = (e) => {
    this.setState({ city: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.city === "") {
        this.setState({ errorMessage: "You must select a city" })
    } else {
        this.props.setSelectedCity(this.state.city)
        this.props.history.push(`/${this.state.city}`)
    }
  };

  render() {
    return (
      <div className="sidebar-container">
        <form className="sidebar-form">
          <p className="sidebar-message">
            Select a different city:
          </p>
          <select
            className="city-selection"
            placeholder="select a city"
            onChange={this.handleSelection}
          >
            <option disabled selected value="select a city">
              Select a City
            </option>
            <option value="Arvada">Arvada</option>
            <option value="Broomfield">Broomfield</option>
            <option value="Lafayette">Lafayette</option>
            <option value="Louisville">Louisville</option>
            <option value="Superior">Superior</option>
            <option value="Westminster">Westminster</option>
          </select>
          <button className="enter-page-button" onClick={this.handleSubmit}>
            Find New Trails
          </button>
          <p className="error-message">{this.state.errorMessage}</p>
        </form>
        <button>My Saved Trails</button>
        <div>
            <h4>Support your local running stores:</h4>
            <ul>
                <li>Runners Roost</li>
                <li>Berkeley Park Running Company</li>
                <li>Shoes & Brews</li>
                <li>PLAYTRI</li>
            </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);