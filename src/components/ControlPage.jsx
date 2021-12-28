import React, { useEffect } from "react";
import ControlPanelCard from "./ControlPanelCard.jsx";
import TimerWindow from "./TimerWindow.jsx";
import { BiHide, BiShow } from "react-icons/bi";
import { HANDLE_TOGGLE_CLUE } from "../../helpers/ipcActions.js";
const { ipcRenderer } = window.require("electron");

const TimerButtons = ({
  handlePauseTimer,
  handleStartTimer,
  handleRestartTimer,
}) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 minutes timer

  return (
    <ControlPanelCard cardTitle="Timer Controls">
      <button
        onClick={handleStartTimer}
        type="button"
        className="btn btn-success timer-button"
      >
        Start Timer
      </button>

      <button
        onClick={handlePauseTimer}
        type="button"
        className="btn btn-primary timer-button"
      >
        Pause Timer
      </button>

      <button
        onClick={handleRestartTimer}
        type="button"
        className="btn btn-outline-danger timer-button timer-button-danger"
      >
        Restart Timer
      </button>
    </ControlPanelCard>
  );
};

const ToggleClue = ({ inputRef, handleToggleClue, showClue }) => {
  return (
    <ControlPanelCard cardTitle="Clue Controls" className="clue-controls">
      <textarea autoFocus ref={inputRef} />
      <div className="row">
        <div className="col-8">
          <button
            onClick={handleToggleClue}
            type="button"
            className="btn btn-primary rounded toggle-clue-button"
          >
            Toggle Clue
          </button>
        </div>
        <div className="col-4">
          {showClue ? (
            <div>
              <p className="clue-hidden-text font-weight-bold">
                Hiding <BiHide />
              </p>
            </div>
          ) : (
            <div>
              <p className="clue-visible-text font-weight-bold">
                Showing <BiShow />
              </p>
            </div>
          )}
        </div>
      </div>
    </ControlPanelCard>
  );
};

export const ControlPage = ({
  handleToggleClue,
  showClue,
  handlePauseTimer,
  handleStartTimer,
  handleRestartTimer,
  inputRef,
  clue,
}) => {
  useEffect(() => {
    ipcRenderer.send(HANDLE_TOGGLE_CLUE, [showClue, clue]);
  }, [showClue]);

  return (
    <div className="control-bg">
      <div className="row">
        <div className="col-8">
          <TimerWindow />

          <ToggleClue
            inputRef={inputRef}
            handleToggleClue={handleToggleClue}
            showClue={showClue}
            clue={clue}
          />
        </div>
        <div className="col-4">
          <TimerButtons
            handleStartTimer={handleStartTimer}
            handlePauseTimer={handlePauseTimer}
            handleRestartTimer={handleRestartTimer}
          />
        </div>
      </div>
    </div>
  );
};
