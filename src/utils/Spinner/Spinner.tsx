import React from "react";
import "./spinner.css";

const Spinner: React.FC = () => {
  return (
    <div className="center-spinner" data-testid="spinner-element">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
