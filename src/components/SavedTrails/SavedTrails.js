import React from "react";
import "./SavedTrails.css";
import TrailCard from "../TrailCard/TrailCard";

const SavedTrails = (props) => {
  const savedTrailsToDisplay = () => {
    if (props.savedTrails.length > 0) {
      return props.savedTrails.map((trail) => {
        return (
          <TrailCard
            key={trail.id}
            trailInfo={trail}
            city={props.selectedCity}
            setSelectedTrail={props.setSelectedTrail}
          />
        );
      });
    } else {
      return <p>There are currently no trails saved to favorites.</p>;
    }
  };

  return (
    <div className="saved-trails-container">
      <h2>Saved Trails</h2>
      <div className="saved-cards-container">{savedTrailsToDisplay()}</div>
    </div>
  );
};

export default SavedTrails;
