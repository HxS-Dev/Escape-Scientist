import "../assets/css/App.css";
import React from "react";

export const ControlPage = ({ handleToggleClue }) => {
  return (
    <div>
      <h1>Control Page</h1>
      <button
        onClick={handleToggleClue}
        type="button"
        className="btn btn-primary"
      >
        SHOW CLUE
      </button>
    </div>
  );
};
