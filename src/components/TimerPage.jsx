import React, { useState } from "react";
import "../assets/css/App.css";

export const TimerPage = ({ submitthing, test }) => {
  const [isClueVisible, setIsClueVisible] = useState(false);

  return (
    <div className="container">
      <h1>{test}</h1>
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
