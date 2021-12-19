import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import "../assets/css/App.css";

const Timer = ({ timerState }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 minutes timer
  const { seconds, minutes, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log,
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
    <div>
      {minutes}:{seconds}
    </div>
  );
};

export const TimerPage = React.memo(({ showClue, timerState }) => {
  return (
    <div>
      <Timer timerState={timerState} />
      {showClue && <div className="card clue">THE CLUE IS SHOWING!</div>}
      <div className="clues"></div>
    </div>
  );
});
