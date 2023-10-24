import React from "react";
import "./HeaderBanner.css";

// HeaderBanner Component
// It showcases the application's title and has decorative square elements for design purposes.

const HeaderBanner: React.FC = () => {
  return (
    <div className="banner">
      {/*Display the application's title */}
      <div className="banner-text"> Tax Calculator</div>
      <div className="square-one"></div>
      <div className="square-two"></div>
    </div>
  );
};

export default HeaderBanner;
