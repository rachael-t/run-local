import "./BadPath.css";
import { Link } from "react-router-dom";
import React from "react";

const BadPath = () => {
  return (
    <div className="bad-path">
      <div className="bad-path-container">
        <h2>
          Hmm... it doesn't look like there is a trail here. Time to turn
          around!
        </h2>
        <Link to="/">
          <button>Return Home</button>
        </Link>
      </div>
    </div>
  );
};

export default BadPath;
