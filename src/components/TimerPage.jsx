import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
// Skip add videos here

import clueBox from "../assets/media/box.png";

const Timer = ({ timerState }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 minutes timer
  const { seconds, minutes, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });

  useEffect(() => {
    if (timerState.pause) {
      pause();
    }

    if (timerState.start) {
      resume();
    }

    if (timerState.reset) {
      restart(time, false);
    }
  }, [timerState]);

  return (
    <div className="timer">
      {minutes}:{String(seconds).padStart(2,"0")}
    </div>
  );
};

export const TimerPage = ({ showClue, timerState, clue, latestPillCompleted }) => {
  // Skip add video logic
  return (
    <div className="timer-wrapper">
      <Timer timerState={timerState} />
      {!showClue && (
        <div id="clueDiv">
          <div id="container" style={{
            position: "relative",
            marginLeft: "13%",
            marginRight: "18%",
            overflowWrap: "break-word",
          }}>
            <img className="card clue" src={clueBox} alt={"clue"} />
            <h5 className="clue-text">{clue}</h5>
          </div>
        </div>
      )}
    </div>
  );
};
