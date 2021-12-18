import React, { useState } from "react";
import "../assets/css/App.css";
export const TimerPage = ({ setIsClueVisible }) => {
  const onShowClue = () => {
    setIsClueVisible((prev) => !prev);
  };
  return (
    <div className="container">
      <h1>Timer</h1>
      <button type="button" className="btn btn-primary">
        Primary
      </button>

      <div className="row">
        <div className="col">
          <div className="timer card"></div>
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
