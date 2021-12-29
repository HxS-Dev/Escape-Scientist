import { useEffect, useState, useRef } from "react";
const { ipcRenderer } = window.require("electron");
import {
  HANDLE_TOGGLE_CLUE,
  PAUSE_TIMER,
  RESTART_TIMER,
  START_TIMER,
} from "../../helpers/ipcActions";

export const useViewManage = () => {
  const [toggleClue, setToggleClue] = useState(true);
  const [timerState, setTimerState] = useState({
    start: null,
    pause: null,
    reset: null,
  });
  const [pillState, setPillState] = useState({
    Pill1: [0, 0, 0],
    Pill2: [0, 0, 0],
    Pill3: [0, 0, 0],
    Pill4: [0, 0, 0],
  });
  let pillCounter = 0;
  let latestPillCompleted = "";
  const [clueText, setClueText] = useState("");
  const inputRef = useRef();

  const focusTextBox = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    ipcRenderer.on(HANDLE_TOGGLE_CLUE, (event, [toggleClue, clueText]) => {
      setToggleClue(toggleClue);
      setClueText(clueText);
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
      ipcRenderer.removeListener(
        HANDLE_TOGGLE_CLUE,
        (event, [toggleClue, clueText]) => {
          setToggleClue(toggleClue);
        }
      );
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
    setClueText(inputRef.current.value);
  };

  const handlePauseTimer = () => {
    focusTextBox();
    setTimerState({ start: false, pause: true, reset: false });
    ipcRenderer.send(PAUSE_TIMER, timerState);
  };

  const handleStartTimer = () => {
    focusTextBox();
    setTimerState({ start: true, pause: false, reset: false });
    ipcRenderer.send(START_TIMER, timerState);
  };

  const handleRestartTimer = () => {
    focusTextBox();
    if (confirm("Are you sure you want to reset lad?")) {
      setTimerState({ start: false, pause: false, reset: true });
      ipcRenderer.send(RESTART_TIMER, timerState);
    } else {
      return;
    }
  };

  const onClueTextChange = ({ target: { value } }) => {
    const matching = value.match(/\{Pill[1-4]-[1-3]\}/g);
    if (matching != null) {
      pillCounter++;
      inputRef.current.value = value.replace(matching, "");
      const pill = matching[0].match(/Pill[1-4]/g)[0];
      const pillNumber = parseInt(pill.match(/[1-4]/g)[0]);
      const subPillNumber = parseInt(
        matching[0].match(/-[1-3]/g)[0].replace("-", "")
      );
      let rightOrder = true;
      for (let i = 0; i < (subPillNumber-1); i++) {
        if (pillState[pill][i] === 0) {
          rightOrder = false;
        }
      }
      if (pillNumber != 1 && pillState["Pill".concat(pillNumber-1)].reduce((partial_sum, a) => partial_sum & a, 1) === 0) {
        rightOrder = false;
      }
      if (rightOrder) {
        setPillState((pillState) => {
          pillState[pill][subPillNumber - 1] = 1;
          return pillState;
        });
      }
    }
    if (pillCounter === 3) {
      const oldPillCompleted = latestPillCompleted;
      if (pillState["Pill1"].reduce((partial_sum, a) => partial_sum & a, 1)) {
        latestPillCompleted = "Pill1";
        if (pillState["Pill2"].reduce((partial_sum, a) => partial_sum & a, 1)) {
          latestPillCompleted = "Pill2";
          if (
            pillState["Pill3"].reduce((partial_sum, a) => partial_sum & a, 1)
          ) {
            latestPillCompleted = "Pill3";
            if (
              pillState["Pill4"].reduce((partial_sum, a) => partial_sum & a, 1)
            ) {
              latestPillCompleted = "Pill4";
            }
          }
        }
      }
      // Maybe put a case statement here for which pill has been completed
      if (oldPillCompleted === latestPillCompleted) console.log("Failure");
      //reset anything that is not already complete
      //ensure success only if subpills in correct order
      //This is the case where the correct pill is not completed

      pillCounter = 0;
    }
  };

  return {
    handleToggleClue,
    toggleClue,
    clueText,
    handlePauseTimer,
    handleStartTimer,
    handleRestartTimer,
    timerState,
    inputRef,
    onClueTextChange,
  };
};
