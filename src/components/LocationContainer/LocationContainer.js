import React, { Component } from "react";
import "./LocationContainer.css";
import { fetchWeather, fetchTrails } from "../../apiCalls.js";
import TrailCard from "../TrailCard/TrailCard";

class LocationContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      cityWeather: {},
      cityTrails: [],
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
    const [lat, lon] = this.getCityLatLon(this.props.match);
    fetchWeather(lat, lon)
      .then((data) => data)
      .then((weather) =>
        this.setState({
          cityWeather: {
            temp: weather.main.temp,
            type: weather.weather[0].main,
            description: weather.weather[0].description,
          },
        })
      );
    fetchTrails(lat, lon)
      .then((data) => data)
      .then((trails) => this.setState({ cityTrails: trails.trails }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      const [lat, lon] = this.getCityLatLon(this.props.match);
      fetchWeather(lat, lon)
        .then((data) => data)
        .then((weather) =>
          this.setState({
            cityWeather: {
              temp: weather.main.temp,
              type: weather.weather[0].main,
              description: weather.weather[0].description,
            },
          })
        );
      fetchTrails(lat, lon)
        .then((data) => data)
        .then((trails) => this.setState({ cityTrails: trails.trails }));
    }
  }

  render() {
    const cityTrailsToRender = this.state.cityTrails.map((trail) => {
        return <TrailCard name={trail.name} image={trail.imgSmall} />;
      }); 
    return (
      <div className="location-container">
        <h3>{this.props.match}</h3>
        <p>The current temperature is {this.state.cityWeather.temp}°F</p>
        <div className="trails-container">{cityTrailsToRender}</div>
      </div>
    );
  }
}

export default LocationContainer;
