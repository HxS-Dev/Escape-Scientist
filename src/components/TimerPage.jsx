import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import "../assets/css/App.css";

const Timer = ({ timerState }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 minutes timer
  const { seconds, minutes, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log,
    autoStart: true,
  });

  const pauseTimer = () => {
    pause();
  };

  useEffect(() => {
    if (timerState.pause) {
      console.log(timerState.pause, "timerstate");
      pauseTimer();
    }
  }, [timerState, timerState.pause]);

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
};

export const TimerPage = ({ showClue, timerState }) => {
  return (
    <div>
      <Timer timerState={timerState} />
      {showClue && <div className="card clue">THE CLUE IS SHOWING!</div>}
      <div className="clues"></div>
    </div>
  );
};
