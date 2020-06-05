import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import { fetchWeather, fetchTrails } from "../../apiCalls.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCity: "Arvada",
      cityWeather: {},
      trails: [],
    };
  }

  getCityLatLon = (city) => {
    let lat;
    let lon;
    if (city === "Arvada") {
      lat = 39.8028;
      lon = -105.0875;
    } else if (city === "Broomfield") {
      lat = 39.9205;
      lon = -105.0867;
    } else if (city === "Lafayette") {
      lat = 39.9936;
      lon = -105.0897;
    } else if (city === "Louisville") {
      lat = 39.9778;
      lon = -105.1319;
    } else if (city === "Superior") {
      lat = 39.9528;
      lon = -105.1686;
    } else if (city === "Wesminster") {
      lat = 39.8397;
      lon = -105.0372;
    }
    return [lat, lon];
  };

  componentDidMount() {
    const [lat, lon] = this.getCityLatLon(this.state.selectedCity);
    fetchWeather(lat, lon)
      .then((data) => data)
      .then((weather) => 
      this.setState({ cityWeather: 
        {temp: weather.main.temp,
        type: weather.weather[0].main,
        description: weather.weather[0].description} }));
    fetchTrails(lat, lon)
      .then((data) => data)
      .then((trails) => this.setState({ cityTrails: trails }))
  }

  setSelectedCity = (city) => {
    this.setState({ selectedCity: city });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Run Local</h1>
        </header>
        <main>
          <Route
            exact
            path="/"
            render={() => <Landing setSelectedCity={this.setSelectedCity} />}
          />
        </main>
      </div>
    );
  }
}

export default App;
