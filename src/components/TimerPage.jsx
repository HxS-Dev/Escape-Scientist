import React, { useState } from "react";
import "../assets/css/App.css";

export const TimerPage = ({ handleClueVisible, test }) => {
  return (
    <div className="container">
      <h1>{test}</h1>
      <button onClick={handleClueVisible}></button>
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
