import React from "react";
import "./SavedTrails.css";
import TrailCard from "../TrailCard/TrailCard";

const SavedTrails = (props) => {
  const savedTrailsToDisplay = props.savedTrails.map((trail) => {
    return (
      <TrailCard
        key={trail.id}
        trailInfo={trail}
        city={props.selectedCity}
        setSelectedTrail={props.setSelectedTrail}
      />
    );
  });

  return (
    <div className="saved-trails-container">
      <h2>Saved Trails</h2>
      <div className="saved-cards-container">{savedTrailsToDisplay}
      </div>
    </div>
  );
};

export default SavedTrails;
