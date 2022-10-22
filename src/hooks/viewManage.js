import { useEffect, useState, useRef } from "react";
const { ipcRenderer } = window.require("electron");
const SerialPort = require("serialport").SerialPort;
const ReadLine = require("@serialport/parser-readline");
import {
  HANDLE_PILL_LOGIC,
  HANDLE_TOGGLE_CLUE,
  PAUSE_TIMER,
  RESTART_TIMER,
  START_TIMER,
  TOKEN_STATE,
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
  const inputRef = useRef();

  const focusTextBox = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    ipcRenderer.on(
      HANDLE_PILL_LOGIC,
      (event, [subPillCounter, latestPillCompleted, pillError]) => {
        setSubPillCounter(subPillCounter);
        setLatestPillCompleted(latestPillCompleted);
        setPillError(pillError);
      }
    );
    ipcRenderer.on(HANDLE_TOGGLE_CLUE, (event, [toggleClue, clueText]) => {
      setToggleClue(toggleClue);
      setClueText(clueText);
    });
    ipcRenderer.on(TOKEN_STATE, (event, latestPillCompleted) => {
      setLatestPillCompleted(latestPillCompleted);
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
        (event, [subPillCounter, latestPillCompleted, pillError]) => {
          setSubPillCounter(subPillCounter);
          setLatestPillCompleted(latestPillCompleted);
          setPillError(pillError);
        }
      );
      ipcRenderer.removeListener(
        HANDLE_TOGGLE_CLUE,
        (event, [toggleClue, clueText]) => {
          setToggleClue(toggleClue);
        }
      );
      ipcRenderer.removeListener(TOKEN_STATE, (event, latestPillCompleted) => {
        setLatestPillCompleted(latestPillCompleted);
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
    setClueText(inputRef.current.value);
    setLatestPillCompleted((prev) => prev + "a");
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

  const deviceLocation = "/dev/tty.usbmodem142201"
  const baudRate = 9600;
  const matched = false;

  const sendToken = (text) => {
    SerialPort.list().then((devices) => {
      console.log(devices);
      if (matched) {
        const SP = new SerialPort(deviceLocation, {
          baudRate: baudRate,
        });

        SP.on("open", () => this.onConnectionOpened());
        SP.on("close", () => this.onConnectionClosed());

        const parser = SP.pipe(new ReadLine({delimiter: "\n"}));
        parser.on("data", (data) => this.onDataRecieved(data));

        SP.write("message", (err) => {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("message written");
        });
      }
    });
  };

  sendToken("Hello");

  const onClueTextChange = ({ target: { value } }) => {
    const matching = value.match(/\{Pill[1-4]-[1-3]\}/g);
    if (matching != null) {
      setSubPillCounter(subPillCounter + 1);
      inputRef.current.value = value.replace(matching, "");
      const pill = matching[0].match(/Pill[1-4]/g)[0];
      const pillNumber = parseInt(pill.match(/[1-4]/g)[0]);
      const subPillNumber = parseInt(
        matching[0].match(/-[1-3]/g)[0].replace("-", "")
      );
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
        ) === 0
      ) {
        rightOrder = false;
      }
      if (rightOrder) {
        setPillState((pillState) => {
          pillState[pill][subPillNumber - 1] = 1;
          return pillState;
        });
      }
    }
    // {Pill1-1}
    if (subPillCounter === 3) {
      let latestPill = latestPillCompleted;
      let oldPillCompleted = latestPill;
      if (pillState["Pill1"].reduce((partial_sum, a) => partial_sum & a, 1)) {
        latestPill = "Pill1";
        if (pillState["Pill2"].reduce((partial_sum, a) => partial_sum & a, 1)) {
          latestPill = "Pill2";
          if (
            pillState["Pill3"].reduce((partial_sum, a) => partial_sum & a, 1)
          ) {
            latestPill = "Pill3";
            if (
              pillState["Pill4"].reduce((partial_sum, a) => partial_sum & a, 1)
            ) {
              latestPill = "Pill4";
            }
          }
        }
      }
      // Maybe put a case statement here for which pill has been completed
      if (oldPillCompleted === latestPill) {
        setPillError(true);
        //This is the case where the correct pill is not completed
      } else {
        setPillError(false);
      }
      setLatestPillCompleted(latestPill);
      setSubPillCounter(1);
    }
  };

  return {
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
  };
};
