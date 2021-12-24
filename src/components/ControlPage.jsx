import React from "react";
import ControlPanelCard from "./ControlPanelCard.jsx";
import TimerWindow from "./TimerWindow.jsx";
import TextBox from "./TextBox.jsx";
import { BiHide, BiShow } from "react-icons/bi";

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
      <TextBox inputRef={inputRef} className="clue-text"/>
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
}) => {
  return (
    <div className="control-bg">
      <div className="row">
        <div className="col-8">
          <TimerWindow />
          <ToggleClue inputRef={inputRef} handleToggleClue={handleToggleClue} showClue={showClue} />
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
