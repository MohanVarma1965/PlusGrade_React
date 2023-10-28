import React from "react";
import "./spinner.css";

const Spinner: React.FC = () => {
  return (
    <div
      className="center-spinner"
      data-testid="spinner-element"
      role="progressbar"
      aria-busy="true"
      aria-label="Loading..."
    >
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
