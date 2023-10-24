import React from "react";
import "./spinner.css";

interface SpinnerProps {
  visible: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="center-spinner" data-testid="spinner-element">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
