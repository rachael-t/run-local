import React from "react";
import "./TrailDetails.css";
import { Link } from "react-router-dom";

const TrailDetails = (props) => {

  const checkConditions = () => {
    if (
      props.selectedTrail.trailInfo.conditionStatus &&
      props.selectedTrail.trailInfo.conditionDetails
    ) {
      return `Conditions: ${props.selectedTrail.trailInfo.conditionStatus} / ${props.selectedTrail.trailInfo.conditionDetails}`;
    } else {
      return "Conditions: no report found";
    }
  };

  const checkSavedTrails = () => {
    let isSaved = props.savedTrails.find((trail) => {
      return trail.id === props.selectedTrail.trailInfo.id;
    });
    if (props.savedTrails.length > 0 && isSaved) {
      return "Remove from Favorites";
    } else {
      return "Save to Favorites";
    }
  };

  return (
    <div className="trail-container">
      <h2>{props.selectedTrail.trailInfo.name}</h2>
      <p>{props.selectedTrail.trailInfo.summary}</p>
      <div className="trail-details-container">
        <div className="trail-detail-info-container">
          <ul>
            <li>Location: {props.selectedTrail.trailInfo.location}</li>
            <li>Length: {props.selectedTrail.trailInfo.length} miles</li>
            <li>
              Difficulty rating: {props.selectedTrail.trailInfo.difficulty}
            </li>
            <li>{checkConditions()}</li>
            <button
              className="save-button"
              onClick={() =>
                props.setSavedTrails(props.selectedTrail.trailInfo)
              }
            >
              {checkSavedTrails()}
            </button>
          </ul>
        </div>
        <div className="trail-detail-image-container">
          <img
            className="trail-detail-image"
            src={
              props.selectedTrail.trailInfo.imgMedium
                ? props.selectedTrail.trailInfo.imgMedium
                : "/images/no-image-found.jpg"
            }
            alt=""
          />
        </div>
      </div>
      <div className="return-link-container">
        <Link
          className="return-link"
          to={`/trails/${props.selectedTrail.city}`}
        >
          <p className="return-message">
            Go back to view other trails in {props.selectedTrail.city}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default TrailDetails;
