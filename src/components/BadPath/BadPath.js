import React from "react";
import "./BadPath.css";
import { Link } from "react-router-dom";

const BadPath = () => {
  return (
    <div className="bad-path">
      <p>
        Hmm... doesn't look like there is a trail here. Time to turn around!
      </p>
      <Link to="/" className="return-home-link">
        <button>Return Home</button>
      </Link>
    </div>
  );
};

export default BadPath;
