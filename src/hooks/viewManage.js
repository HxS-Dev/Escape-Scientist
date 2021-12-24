import { useCallback, useEffect, useState, useRef } from "react";
const { ipcRenderer } = window.require("electron");
import {
  HANDLE_TOGGLE_CLUE,
  PAUSE_TIMER,
  RESTART_TIMER,
  START_TIMER,
} from "../../helpers/ipcActions";

export const useViewManage = () => {
  const [toggleClue, setToggleClue] = useState(false);
  const [timerState, setTimerState] = useState({
    start: null,
    pause: null,
    reset: null,
  });
  const inputRef = useRef();

  const focusTextBox = () => {
    inputRef.current.focus();
  }

  useEffect(() => {
    ipcRenderer.on(HANDLE_TOGGLE_CLUE, (event, toggleClue) => {
      setToggleClue(toggleClue);
    });
    ipcRenderer.on(START_TIMER, (event, timerState) => {
      setTimerState({ start: true, pause: false, reset: false });
    });
    ipcRenderer.on(RESTART_TIMER, (event, timerState) => {
      setTimerState({ start: false, pause: false, reset: true });
    });
    ipcRenderer.on(PAUSE_TIMER, (event, timerState) => {
      setTimerState({ start: false, pause: true, reset: false });
    });
    return () => {
      ipcRenderer.removeListener(HANDLE_TOGGLE_CLUE, (event, toggleClue) => {
        setToggleClue(toggleClue);
      });
      ipcRenderer.removeListener(PAUSE_TIMER, (event, timerState) => {
        setTimerState({ start: false, pause: true, reset: false });
      });
      ipcRenderer.removeListener(START_TIMER, (event, timerState) => {
        setTimerState({ start: true, pause: false, reset: false });
      });
      ipcRenderer.removeListener(RESTART_TIMER, (event, timerState) => {
        setTimerState({ start: false, pause: false, reset: true });
      });
    };
  }, []);

  const handleToggleClue = () => {
    focusTextBox();
    setToggleClue((prev) => !prev);
    ipcRenderer.send(HANDLE_TOGGLE_CLUE, toggleClue);
  };

  const handlePauseTimer = useCallback(() => {
    focusTextBox();
    setTimerState({ start: false, pause: true, reset: false });
    ipcRenderer.send(PAUSE_TIMER, timerState);
  }, [timerState]);

  const handleStartTimer = useCallback(() => {
    focusTextBox();
    setTimerState({ start: true, pause: false, reset: false });
    ipcRenderer.send(START_TIMER, timerState);
  }, [timerState]);

  const handleRestartTimer = useCallback(() => {
    focusTextBox();
    if (confirm("Are you sure you want to reset lad?")) {
      setTimerState({ start: false, pause: false, reset: true });
      ipcRenderer.send(RESTART_TIMER, timerState);
    } else {
      return;
    }
  }, [timerState]);

  return {
    handleToggleClue,
    toggleClue,
    handlePauseTimer,
    handleStartTimer,
    handleRestartTimer,
    timerState,
    inputRef,
  };
};
