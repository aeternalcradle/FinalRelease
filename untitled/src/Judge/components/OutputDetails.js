import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div style={{ color: "black" }}>
      <p className="text-sm">
        Memory:{" "}
        <span>
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span >
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
