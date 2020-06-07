import React, { Component } from "react";
import "./LocationContainer.css";
import { fetchWeather, fetchTrails } from "../../apiCalls.js";
import TrailCard from "../TrailCard/TrailCard";

let cityWeather = {
  description: "overcast clouds",
  temp: 71.46,
  type: "Cloud",
};

let cityTrails = [
  {
    id: 7011192,
    name: "Boulder Skyline Traverse",
    summary: "The classic long mountain route in Boulder.",
    difficulty: "black",
    location: "Superior, Colorado",
    url:
      "https://www.trailrunproject.com/trail/7011192/boulder-skyline-traverse",
    imgSmall:
      "https://cdn2.apstatic.com/photos/hike/7048859_small_1555540136.jpg",
    imgSmallMed:
      "https://cdn2.apstatic.com/photos/hike/7048859_smallMed_1555540136.jpg",
    imgMedium:
      "https://cdn2.apstatic.com/photos/hike/7048859_medium_1555540136.jpg",
    length: 16.3,
    conditionStatus: "All Clear",
    conditionDetails: "Dry",
    conditionDate: "2020-05-27 14:38:34",
  },
  {
    id: 7000130,
    name: "Bear Peak Out and Back",
    summary: "A must-do run for Boulder locals and visitors alike!",
    difficulty: "black",
    location: "Boulder, Colorado",
    url: "https://www.trailrunproject.com/trail/7000130/bear-peak-out-and-back",
    imgSmall:
      "https://cdn2.apstatic.com/photos/hike/7005382_small_1554312030.jpg",
    imgSmallMed:
      "https://cdn2.apstatic.com/photos/hike/7005382_smallMed_1554312030.jpg",
    imgMedium:
      "https://cdn2.apstatic.com/photos/hike/7005382_medium_1554312030.jpg",
    length: 5.7,
    conditionStatus: "All Clear",
    conditionDetails: "Dry",
    conditionDate: "2020-05-22 16:05:31",
  },
  {
    id: 7004226,
    name: "Sunshine Lion's Lair Loop",
    summary:
      "Great Mount Sanitas views are the reward for this gentler loop in Sunshine Canyon.",
    difficulty: "blueBlack",
    location: "Boulder, Colorado",
    url:
      "https://www.trailrunproject.com/trail/7004226/sunshine-lions-lair-loop",
    imgSmall:
      "",
    imgSmallMed:
      "",
    imgMedium:
      "",
    length: 5.3,
    conditionStatus: "All Clear",
    conditionDetails: "Dry - Clear of ice and mud",
    conditionDate: "2020-05-08 14:06:04",
  },
];

class LocationContainer extends Component {
  constructor(props) {
    super();
    this.state = {
    //   cityWeather: '',
    //   cityTrails: [],
    cityWeather: cityWeather,
    cityTrails: cityTrails

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
    } else if (city === "Westminster") {
      lat = 39.8397;
      lon = -105.0372;
    }
    return [lat, lon];
  };

    // componentDidMount() {
    //   const [lat, lon] = this.getCityLatLon(this.props.match);
    //   fetchWeather(lat, lon)
    //     .then((data) => data)
    //     .then((weather) =>
    //       this.setState({
    //         cityWeather: {
    //           temp: weather.main.temp,
    //           type: weather.weather[0].main,
    //           description: weather.weather[0].description,
    //         },
    //       })
    //     );
    //   fetchTrails(lat, lon)
    //     .then((data) => data)
    //     .then((trails) => this.setState({ cityTrails: trails.trails }));
    // }

    // componentDidUpdate(prevProps) {
    //   if (this.props.match !== prevProps.match) {
    //     const [lat, lon] = this.getCityLatLon(this.props.match);
    //     fetchWeather(lat, lon)
    //       .then((data) => data)
    //       .then((weather) =>
    //         this.setState({
    //           cityWeather: {
    //             temp: weather.main.temp,
    //             type: weather.weather[0].main,
    //             description: weather.weather[0].description,
    //           },
    //         })
    //       );
    //     fetchTrails(lat, lon)
    //       .then((data) => data)
    //       .then((trails) => this.setState({ cityTrails: trails.trails }));
    //   }
    // }

  render() {
    const cityTrailsToRender = this.state.cityTrails.map((trail) => {
      return (
        <TrailCard
          key={trail.id}
          trailInfo={trail}
          city={this.props.match}
          setSelectedTrail={this.props.setSelectedTrail}
        />
      );
    });
    return (
      <div className="location-container">
        <h2>{this.props.match}</h2>
        <p>The current temperature is {this.state.cityWeather.temp}°F</p>
        <p>Current conditions are: {this.state.cityWeather.description}</p>
        <div className="trails-container">{cityTrailsToRender}</div>
      </div>
    );
  }
}

export default LocationContainer;
