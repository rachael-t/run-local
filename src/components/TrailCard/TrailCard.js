import "./TrailCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const TrailCard = (props) => {
  return (
    <div className="trail-card">
      <h2>{props.trailInfo.name}</h2>
      <img
        className="trail-card-image"
        src={
          props.trailInfo.imgSmallMed
            ? props.trailInfo.imgSmallMed
            : "/images/no-image-found.jpg"
        }
        alt="view of trail"
      />
      <Link
        to={`/trails/${props.city}/${props.trailInfo.name}`}
        className="trail-card-link"
      >
        <button
          className="view-trail-details"
          onClick={() => props.setSelectedTrail(props)}
        >
          View Trail Details
        </button>
      </Link>
    </div>
  );
};

export default TrailCard;

TrailCard.propTypes = {
  trailInfo: PropTypes.object,
  city: PropTypes.string,
  setSelectedTrail: PropTypes.func,
};
