// Shimmer.js
import React from "react";
import "./Shimmer.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Shimmer({ height, width }) {
  return (
    <div className="shimmer-container">
      <Skeleton height={height} width={width} />
    </div>
  );
}

export default Shimmer;
