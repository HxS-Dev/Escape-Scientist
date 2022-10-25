import React, { useEffect, useMemo } from "react";
import { useTimer } from "react-timer-hook";
import sceneOne from "../assets/media/Scene1.mp4";
import sceneTwo from "../assets/media/Scene2.mp4";
import sceneThree from "../assets/media/Scene3.mp4";
import sceneFour from "../assets/media/Scene4.mp4";
import sceneFive from "../assets/media/Scene5.mp4";

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

export const TimerPage = ({
  showClue,
  timerState,
  clue,
  latestPillCompleted,
}) => {
  console.log({ latestPillCompleted });

  // const videoSrc = () => {
  //   switch (latestPillCompleted) {
  //     case "Pill1":
  //       return sceneTwo;
  //     case "Pill2":
  //       return sceneThree;
  //     case "Pill3":
  //       return sceneFour;
  //     case "Pill4":
  //       return sceneFive;
  //     default:
  //       return sceneOne;
  //   }
  // };

  // const src = useMemo(() => videoSrc(), [latestPillCompleted]);

  // console.log(src);

  return (
    <div className="timer-wrapper">
      {/* <video autoPlay id="myVideo">
        <source src={src} type="video/mp4" />
      </video> */}
      <Timer timerState={timerState} />
      {!showClue && (
        <div id="clueDiv">
          <div
            id="container"
            style={{
              position: "relative",
              marginLeft: "13%",
              marginRight: "18%",
              overflowWrap: "break-word",
            }}
          >
            <img className="card clue" src={clueBox} alt={"clue"} />
            <h5 className="clue-text">{clue}</h5>
          </div>
        </div>
      )}
    </div>
  );
};
