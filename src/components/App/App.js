import "./App.css";
import { Route, Switch } from "react-router-dom";
import Landing from "../Landing/Landing";
import LocationContainer from "../LocationContainer/LocationContainer";
import React, { Component } from "react";
import SavedTrails from "../SavedTrails/SavedTrails";
import Sidebar from "../Sidebar/Sidebar";
import TrailDetails from "../TrailDetails/TrailDetails";
import BadPath from "../BadPath/BadPath";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCity: "",
      selectedTrail: "",
      savedTrails: [],
    };
  }

  setSelectedCity = (city) => {
    this.setState({ selectedCity: city });
  };

  setSelectedTrail = (trail) => {
    this.setState({ selectedTrail: trail });
  };

  setSavedTrails = (trail) => {
    const isFavorited = this.state.savedTrails.find((favorite) => {
      return favorite.id === trail.id;
    });
    const filteredTrails = this.state.savedTrails.filter(
      (savedTrail) => savedTrail.id !== trail.id
    );
    isFavorited
      ? this.setState({ savedTrails: filteredTrails })
      : this.setState({ savedTrails: [...this.state.savedTrails, trail] });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Run Local</h1>
        </header>
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Landing setSelectedCity={this.setSelectedCity} />}
            />
            <Route
              exact
              path="/trails/:selectedCity"
              render={({ match }) => {
                return (
                  <div className="city-page">
                    <Sidebar setSelectedCity={this.setSelectedCity} />
                    <LocationContainer
                      match={match.params.selectedCity}
                      selectedCity={this.state.selectedCity}
                      setSelectedTrail={this.setSelectedTrail}
                    />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/trails/:selectedCity/:selectedTrail"
              render={({ match }) => {
                return (
                  <div className="city-page">
                    <Sidebar setSelectedCity={this.setSelectedCity} />
                    <TrailDetails
                      selectedTrail={this.state.selectedTrail}
                      setSavedTrails={this.setSavedTrails}
                      savedTrails={this.state.savedTrails}
                    />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/SavedTrails"
              render={() => {
                return (
                  <div className="saved-page">
                    <Sidebar setSelectedCity={this.setSelectedCity} />
                    <SavedTrails
                      savedTrails={this.state.savedTrails}
                      selectedCity={this.state.selectedCity}
                      setSelectedTrail={this.setSelectedTrail}
                    />
                  </div>
                );
              }}
            />
            <Route path="" render={() => <BadPath />} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
