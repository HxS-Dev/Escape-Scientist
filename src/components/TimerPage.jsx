import { app } from "electron";
import React, { useEffect } from "react";
import { BiSleepy } from "react-icons/bi";
import { useTimer } from "react-timer-hook";

import clueBox from "../assets/media/box.png";

const Timer = ({ timerState }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600);
  const { seconds, minutes, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });

  useEffect(() => {
    if (timerState.pause) {
      document.querySelector('iframe').contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
      pause();
    }

    if (timerState.start) {
      document.querySelector('iframe').contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      if (seconds == 0 && minutes == 0) {
        document.querySelector('.timer').style.display = 'none';
        setTimeout(() => {
          document.querySelector('.timer').style.display = 'block';
          resume();
        }, 60000)
      } else {
        resume();
      }
    }

    if (timerState.reset) {
      app.relaunch()
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
        return ["https://www.youtube.com/embed/5lzQJePPVOU", "1"];
      case "Pill2":
        return ["https://www.youtube.com/embed/U71YwxzmCtM", "1"];
      case "Pill3":
        return ["https://www.youtube.com/embed/Rw2WsGpSQPM", "1"];
      case "Pill4":
        return ["https://www.youtube.com/embed/5hykgJBh6Ws", "1"];
      default:
        return ["https://www.youtube.com/embed/owaCkS-GJks", "0"];
    }
  };

  return (
    <div className="timer-wrapper">
      <iframe width="100%" height="100%" src={videoSrc()[0] + "?loop=1&controls=0&autoplay=" + videoSrc()[1] + "&showinfo=0&modestbranding=1&autohide=1&enablejsapi=1&rel=0"}></iframe>
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
