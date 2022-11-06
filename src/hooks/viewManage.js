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

let portOpen = false;

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
  const pillStateRef = useRef(pillState);

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
    "5396716",
    "1609007",
    "6782864",
    "2917831",
    "8888174",
    "4404037",
    "4221649",
    "6031157",
    "8795911",
    "9887777",
    "5385933",
    "3301546",
    "5194401",
    "5101864",
    "3302796",
    "3681964",
    "5640586",
    "2697777",
    "9388003",
    "7277718",
    "3702799",
    "7106113",
    "9350948",
    "7417372",
    "6369150",
    "8488219",
    "1159769",
    "9761257",
    "2815928",
    "4501668",
    "2902141",
    "2624065",
    "5091685",
    "3429376",
    "3983308",
    "2656444",
    "3545420",
    "3653792",
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
  }, []);

  useEffect(() => {
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

  const handleRestartTimer = async () => {
    focusTextBox();

    // await awaitTimeout(4000);
    if (confirm("Are you sure you want to reset?")) {
      // setTimerState({ start: false, pause: false, reset: true });
      // ipcRenderer.send(RESTART_TIMER, timerState);
      sendToken("TOKEN_ZERO");
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
    await awaitTimeout(6000);
    setPillCompletedUi("loading");
    await awaitTimeout(5000);
    setPillCompletedUi("complete");
    await awaitTimeout(16000);
    setPillCompletedUi("");
  };

  const onClueTextChange = async ({ target: { value } }) => {
    let rightOrder = true;

    const matching = indexOfR(value, pills);
    if (matching != -1) {
      setSubPillCounter(subPillCounter + 1);
      inputRef.current.value = value.replace(pills[matching], "");
      if (matching < 12) {
        const pillNumber = Math.floor(matching / 3) + 1;
        const subPillNumber = Math.floor(matching % 3) + 1;
        const pill = "Pill" + pillNumber.toString();
        for (let i = 0; i < subPillNumber - 1; i++) {
          if (pillState[pill][i] == 0) {
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
          pillStateRef.current[pill][subPillNumber - 1] = 1;
          ipcRenderer.send(TOKEN_STATE, [latestPillCompleted, pillState]);
        }
      } else {
        rightOrder = false;
      }

      if (subPillCounter == 3) {
        if (!rightOrder) {
          setSubPillCounter(1);
          setPillError(true);
          setTimeout(() => {
            setPillError(false);
          }, 2000);
          return;
        }
        let latestPill = latestPillCompleted;
        let oldPillCompleted = latestPill;

        switch (latestPillCompleted) {
          case "asd":
            if (
              pillStateRef.current["Pill1"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 4
            ) {
              console.log(pillState, "in if");
              latestPill = "Pill1";
              sendToken("TOKEN_ONE");
              4;
              await cyclePillCompletedUi();
            } else {
              setPillState((pillState) => {
                pillState["Pill1"] = [0, 0, 0];
                return pillState;
              });
              pillStateRef.current["Pill1"] = [0, 0, 0];
            }
            break;
          case "Pill1":
            if (
              pillStateRef.current["Pill2"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 4
            ) {
              latestPill = "Pill2";
              sendToken("TOKEN_TWO");
              await cyclePillCompletedUi();
            } else {
              setPillState((pillState) => {
                pillState["Pill2"] = [0, 0, 0];
                return pillState;
              });
              pillStateRef.current["Pill2"] = [0, 0, 0];
            }
            break;
          case "Pill2":
            if (
              pillStateRef.current["Pill3"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 4
            ) {
              latestPill = "Pill3";
              sendToken("TOKEN_THREE");
              await cyclePillCompletedUi();
            } else {
              setPillState((pillState) => {
                pillState["Pill3"] = [0, 0, 0];
                return pillState;
              });
              pillStateRef.current["Pill3"] = [0, 0, 0];
            }
            break;
          case "Pill3":
            if (
              pillStateRef.current["Pill4"].reduce(
                (partial_sum, a) => partial_sum + a,
                1
              ) == 4
            ) {
              latestPill = "Pill4";
              sendToken("TOKEN_FOUR");
              await cyclePillCompletedUi();
            } else {
              setPillState((pillState) => {
                pillState["Pill4"] = [0, 0, 0];
                return pillState;
              });
              pillStateRef.current["Pill4"] = [0, 0, 0];
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
          }, 2000);
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
    console.log(subPillCounter);
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
