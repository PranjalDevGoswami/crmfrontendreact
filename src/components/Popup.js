import React from "react";

const Popup = ({ children, onClose }) => {
  return (
    <div className="popup-container">
      <div className="backdrop" onClick={onClose}></div>
      <div className="popup-content">
        {children} {/* Render dynamic content here */}
      </div>
    </div>
  );
};

export default Popup;