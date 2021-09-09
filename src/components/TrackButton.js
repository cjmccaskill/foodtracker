import React from "react";
import { Link } from "react-router-dom";

const TrackButton = () => {
  return (
    <Link to="/new">
      <button>Track Food</button>
    </Link>
  );
};

export default TrackButton;
