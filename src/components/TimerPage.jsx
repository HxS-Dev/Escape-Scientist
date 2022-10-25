import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

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
      {minutes}:{String(seconds).padStart(2, "0")}
    </div>
  );
};

export const TimerPage = ({ showClue, timerState, clue, latestPillCompleted }) => {

  const videoSrc = () => {
    switch (latestPillCompleted) {
      case "Pill1":
        return "https://www.youtube.com/embed/wN-mZtbX2Pg";
      case "Pill2":
        return "https://www.youtube.com/embed/RVEm5Am-tYc";
      case "Pill3":
        return "https://www.youtube.com/embed/knjliFs3gR8";
      case "Pill4":
        return "https://www.youtube.com/embed/lImLEzQu2kU";
      default:
        return "https://www.youtube.com/embed/3E17wr77ffM";
    }
  };

  return (
    <div className="timer-wrapper">
      <iframe width="100%" height="100%" src={videoSrc() + "?loop=1&controls=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1&mute=1"}></iframe>
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
