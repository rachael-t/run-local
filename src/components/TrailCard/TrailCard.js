import React from "react";
import "./TrailCard.css";
import { Link } from "react-router-dom";

const TrailCard = (props) => {
  console.log("hello");
  return (
    <div className="trail-card">
      <h2>{props.name}</h2>
      <img
        className="trail-card-image"
        src={props.image ? props.image : "/images/no-image-found.jpg"}
        alt=""
      />
      <Link to={`/`} className="trail-card-link">
        <button className="view-trail-details">View Trail Details</button>
      </Link>
    </div>
  );
};

export default TrailCard;
