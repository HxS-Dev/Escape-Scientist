import React from "react";
import "../assets/css/App.css";

export const TimerPage = ({ showClue }) => {
  return (
    <div className="container">
      <h1>Timer</h1>
      <div className="row">
        <div className="col">
          {showClue && <div className="timer card">THE CLUE IS SHOWING!</div>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="clues"></div>
        </div>
      </div>
    </div>
  );
};
