import "../assets/css/App.css";
import React from "react";

const TimerButtons = ({ handlePauseTimer }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 minutes timer

  return (
    <button
      onClick={handlePauseTimer}
      type="button"
      className="btn btn-primary"
    >
      Pause Timer
    </button>
  );
};

export const ControlPage = ({ handleToggleClue, handlePauseTimer }) => {
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
      <TimerButtons handlePauseTimer={handlePauseTimer} />
    </div>
  );
};
