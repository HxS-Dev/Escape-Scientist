import { useEffect, useState, useRef } from "react";
const { ipcRenderer } = window.require("electron");
const SerialPort = require("serialport").SerialPort;

import hint1f from "../assets/media/hint1And5.mp3";
import hint2f from "../assets/media/hint2.mp3";
import hint3f from "../assets/media/hint3.mp3";
import hint4f from "../assets/media/hint4.mp3";

import {
  HANDLE_PILL_LOGIC,
  HANDLE_TOGGLE_CLUE,
  PAUSE_TIMER,
  RESTART_TIMER,
  START_TIMER,
  TOKEN_STATE,
  PILL_ERROR,
  PILL_UI,
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
  const [subPillCounter, setSubPillCounter] = useState(1);
  const [latestPillCompleted, setLatestPillCompleted] = useState("asd");
  const [clueText, setClueText] = useState("");
  const [pillError, setPillError] = useState(false);
  const [pillCompletedUi, setPillCompletedUi] = useState("");
  const inputRef = useRef();

  const pills = [
    "8555358",
    "8900661",
    "4913251",
    "6383587",
    "1530478",
    "9104264",
    "4450546",
    "7632618",
    "8752056",
    "3248916",
    "3663714",
    "9338264",
  ];

  const focusTextBox = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    ipcRenderer.on(
      HANDLE_PILL_LOGIC,
      (event, [subPillCounter, latestPillCompleted]) => {
        setSubPillCounter(subPillCounter);
        setLatestPillCompleted(latestPillCompleted);
      }
    );
    ipcRenderer.on(PILL_ERROR, (event, pillError) => {
      setPillError(pillError);
    });
    ipcRenderer.on(HANDLE_TOGGLE_CLUE, (event, [toggleClue, clueText]) => {
      setToggleClue(toggleClue);
      setClueText(clueText);
    });
    ipcRenderer.on(TOKEN_STATE, (event, [latestPillCompleted, pillState]) => {
      setLatestPillCompleted(latestPillCompleted);
      setPillState(pillState);
    });
    ipcRenderer.on(PILL_UI, (event, pillCompletedUi) => {
      setPillCompletedUi(pillCompletedUi);
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
        HANDLE_PILL_LOGIC,
        (event, [subPillCounter, latestPillCompleted]) => {
          setSubPillCounter(subPillCounter);
          setLatestPillCompleted(latestPillCompleted);
        }
      );
      ipcRenderer.removeListener(PILL_ERROR, (event, pillError) => {
        setPillError(pillError);
      });
      ipcRenderer.removeListener(PILL_UI, (event, pillCompletedUi) => {
        setPillCompletedUi(pillCompletedUi);
      });
      ipcRenderer.removeListener(
        HANDLE_TOGGLE_CLUE,
        (event, [toggleClue, clueText]) => {
          setToggleClue(toggleClue);
        }
      );
      ipcRenderer.removeListener(
        TOKEN_STATE,
        (event, [latestPillCompleted, pillState]) => {
          setLatestPillCompleted(latestPillCompleted);
          setPillState(pillState);
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
  }, [
    subPillCounter,
    latestPillCompleted,
    pillError,
    toggleClue,
    clueText,
    pillState,
    timerState,
  ]);

  const hint1And5 = new Audio(hint1f);
  const hint2 = new Audio(hint2f);
  const hint3 = new Audio(hint3f);
  const hint4 = new Audio(hint4f);

  const getHintSound = () => {
    switch (latestPillCompleted) {
      case "Pill1":
        return hint2;
      case "Pill2":
        return hint3;
      case "Pill3":
        return hint4;
      default:
        return hint1And5;
    }
  };

  const handleToggleClue = () => {
    focusTextBox();
    setToggleClue((prev) => !prev);
    setClueText(inputRef.current.value);

    if (toggleClue) {
      getHintSound().play();
    }
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
    if (confirm("Are you sure you want to reset?")) {
      setTimerState({ start: false, pause: false, reset: true });
      ipcRenderer.send(RESTART_TIMER, timerState);
    } else {
      return;
    }
  };

  const port = new SerialPort({
    path: "COM4",
    baudRate: 9600,
    autoOpen: false,
  });

  const awaitTimeout = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const sendToken = (text) => {
    SerialPort.list().then(async (devices) => {
      console.log(devices);

      port.open();
      await awaitTimeout(1000);
      port.write(text, (err) => {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("Message Written");
      });

      await awaitTimeout(1000);
      port.close();
    });
  };

  const indexOfR = (value, arr) => {
    for (var i = 0; i < arr.length; i++) {
      if (value.match(arr[i])) {
        return i;
      }
    }
    return -1;
  };

  const cyclePillCompletedUi = async () => {
    setPillCompletedUi("insert");
    await awaitTimeout(7000);
    setPillCompletedUi("loading");
    await awaitTimeout(5000);
    setPillCompletedUi("complete");
    await awaitTimeout(17000);
    setPillCompletedUi("");
  };

  const onClueTextChange = async ({ target: { value } }) => {
    if (pillError == "true")
      setTimeout(() => {
        setPillError(false);
      }, 5000);
    const matching = indexOfR(value, pills);
    if (matching != -1) {
      setSubPillCounter(subPillCounter + 1);
      inputRef.current.value = value.replace(pills[matching], "");
      const pillNumber = Math.floor(matching / 3) + 1;
      const subPillNumber = Math.floor(matching % 3) + 1;
      const pill = "Pill" + pillNumber;
      let rightOrder = true;
      for (let i = 0; i < subPillNumber - 1; i++) {
        if (pillState[pill][i] === 0) {
          rightOrder = false;
        }
      }
      if (
        pillNumber != 1 &&
        pillState["Pill".concat(pillNumber - 1)].reduce(
          (partial_sum, a) => partial_sum & a,
          1
        ) == 0
      ) {
        rightOrder = false;
      }
      if (rightOrder) {
        setPillState((pillState) => {
          pillState[pill][subPillNumber - 1] = 1;
          return pillState;
        });
        ipcRenderer.send(TOKEN_STATE, [latestPillCompleted, pillState]);
      }

      if (subPillCounter == 3) {
        let latestPill = latestPillCompleted;
        let oldPillCompleted = latestPill;

        switch (latestPillCompleted) {
          case "asd":
            if (
              pillState["Pill1"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 3
            ) {
              latestPill = "Pill1";
              sendToken("TOKEN_ONE");
              await cyclePillCompletedUi();
            }
            break;
          case "Pill1":
            if (
              pillState["Pill2"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 3
            ) {
              latestPill = "Pill2";
              sendToken("TOKEN_TWO");
              await cyclePillCompletedUi();
            }
            break;
          case "Pill2":
            if (
              pillState["Pill3"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 3
            ) {
              latestPill = "Pill3";
              sendToken("TOKEN_THREE");
              await cyclePillCompletedUi();
            }
            break;
          case "Pill3":
            if (
              pillState["Pill4"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 3
            ) {
              latestPill = "Pill4";
              sendToken("TOKEN_FOUR");
              await cyclePillCompletedUi();
            }
            break;
          default:
            break;
        }

        // Maybe put a case statement here for which pill has been completed

        setLatestPillCompleted(latestPill);
        setSubPillCounter(1);
        if (oldPillCompleted == latestPill) {
          setPillError(true);
          //This is the case where the correct pill is not completed
          setTimeout(() => {
            setPillError(false);
          }, 7000);
        } else {
          setPillError(false);
        }
      }
    }
  };

  useEffect(() => {
    ipcRenderer.send(HANDLE_PILL_LOGIC, [
      subPillCounter,
      latestPillCompleted,
      pillError,
    ]);
  }, [subPillCounter]);

  useEffect(() => {
    ipcRenderer.send(PILL_ERROR, pillError);
  }, [pillError]);

  useEffect(() => {
    ipcRenderer.send(PILL_UI, pillCompletedUi);
  }, [pillCompletedUi]);

  return {
    subPillCounter,
    latestPillCompleted,
    handleToggleClue,
    toggleClue,
    clueText,
    handlePauseTimer,
    handleStartTimer,
    handleRestartTimer,
    timerState,
    inputRef,
    onClueTextChange,
    pillError,
    pillState,
    pillCompletedUi,
  };
};
