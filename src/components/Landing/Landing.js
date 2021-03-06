import "./Landing.css";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Landing extends Component {
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
      <div className="landing-container">
        <form className="landing-form" aria-label="select a city form">
          <h2>Welcome!</h2>
          <p className="welcome-message">
            Please select a city you would like to run in:
          </p>
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
          <button className="enter-page-button" onClick={this.handleSubmit}>
            Find Trails
          </button>
          <p className="error-message">{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }
}

export default withRouter(Landing);

Landing.propTypes = {
  setSelectedCity: PropTypes.func,
};
