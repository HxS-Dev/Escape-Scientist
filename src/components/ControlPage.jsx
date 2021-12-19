import "../assets/css/App.css";
import React from "react";

const TimerButtons = ({
  handlePauseTimer,
  handleStartTimer,
  handleRestartTimer,
}) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 minutes timer

  return (
    <div>
      <button
        onClick={handlePauseTimer}
        type="button"
        className="btn btn-primary"
      >
        Pause Timer
      </button>

      <button
        onClick={handleStartTimer}
        type="button"
        className="btn btn-primary"
      >
        Start Timer
      </button>

      <button
        onClick={handleRestartTimer}
        type="button"
        className="btn btn-primary"
      >
        Restart Timer
      </button>
    </div>
  );
};

export const ControlPage = ({
  handleToggleClue,
  handlePauseTimer,
  handleStartTimer,
  handleRestartTimer,
}) => {
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
      <TimerButtons
        handleStartTimer={handleStartTimer}
        handlePauseTimer={handlePauseTimer}
        handleRestartTimer={handleRestartTimer}
      />
    </div>
  );
};
