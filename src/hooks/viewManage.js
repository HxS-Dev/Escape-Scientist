import { useState } from "react";
const { ipcRenderer } = window.require("electron");
import { HANDLE_TOGGLE_CLUE, PAUSE_TIMER } from "../../helpers/ipcActions";

export const useViewManage = () => {
  const [toggleClue, setToggleClue] = useState(false);

  const handleToggleClue = () => {
    setToggleClue((prev) => !prev);
    ipcRenderer.send(HANDLE_TOGGLE_CLUE, toggleClue);
  };
  ipcRenderer.on(HANDLE_TOGGLE_CLUE, (event, toggleClue) => {
    setToggleClue(toggleClue);
  });

  const [timerState, setTimerState] = useState({
    start: null,
    pause: null,
    reset: null,
  });

  const handlePauseTimer = () => {
    setTimerState({ start: false, pause: true, reset: false });
    ipcRenderer.send(PAUSE_TIMER, timerState);
  };
  ipcRenderer.on(PAUSE_TIMER, (event, timerState) => {
    setTimerState({ start: false, pause: true, reset: false });
  });

  return {
    handleToggleClue,
    toggleClue,
    handlePauseTimer,
    timerState,
  };
};
