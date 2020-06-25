import "./Sidebar.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super();
    this.state = {
      city: "",
      errorMessage: "",
    };
  }

  handleSelection = (e) => {
    this.setState({ city: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.city === "") {
      this.setState({ errorMessage: "You must select a city" });
    } else {
      this.props.setSelectedCity(this.state.city);
      this.props.history.push(`/trails/${this.state.city}`);
    }
  };

  render() {
    return (
      <div className="sidebar-container">
        <img
          src="https://img.icons8.com/ios/50/000000/like.png"
          alt="heart icon"
        />
        <Link to="/SavedTrails" className="saved-trails-link">
          <button className="saved-trails-button">My Saved Trails</button>
        </Link>
        <form className="sidebar-form" aria-label="select a city form">
          <img
            src="https://img.icons8.com/ios/50/000000/trail--v2.png"
            alt="trail icon"
          />
          <p className="sidebar-message">Select a different city:</p>
          <select
            className="city-selection"
            placeholder="select a city"
            onChange={this.handleSelection}
            defaultValue={"select a city"}
            aria-label="select a city dropdown"
          >
            <option disabled value="select a city">
              Select a City
            </option>
            <option value="Arvada">Arvada</option>
            <option value="Broomfield">Broomfield</option>
            <option value="Lafayette">Lafayette</option>
            <option value="Louisville">Louisville</option>
            <option value="Superior">Superior</option>
            <option value="Westminster">Westminster</option>
          </select>
          <button className="new-trails-button" onClick={this.handleSubmit}>
            Find New Trails
          </button>
          <p className="error-message">{this.state.errorMessage}</p>
        </form>
        <img
          src="https://img.icons8.com/dotty/80/000000/shop-local.png"
          alt="shopping bag with heart icon"
        />
        <div>
          <h4>Local Running Stores:</h4>
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

Sidebar.propTypes = {
  setSelectedCity: PropTypes.func,
};
