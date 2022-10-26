import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ControlPage } from "./ControlPage.jsx";
import { BarcodePage } from "./BarcodePage.jsx";
import { TimerPage } from "./TimerPage.jsx";
import { useViewManage } from "../hooks/viewManage.js";
import "../assets/css/App.css";

export const ViewManage = () => {
  const {
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
    latestPillCompleted,
    pillState,
    subPillCounter,
  } = useViewManage();

  return (
    <Router>
      <div>
        <Route
          exact
          path="/control"
          render={() => (
            <ControlPage
              inputRef={inputRef}
              handleToggleClue={handleToggleClue}
              handlePauseTimer={handlePauseTimer}
              handleStartTimer={handleStartTimer}
              handleRestartTimer={handleRestartTimer}
              showClue={toggleClue}
              clue={clueText}
              onClueTextChange={onClueTextChange}
              error={pillError}
              latestPillCompleted={latestPillCompleted}
              pillState={pillState}
            />
          )}
        />

        <Route
          exact
          path="/timer"
          render={() => (
            <TimerPage
              showClue={toggleClue}
              timerState={timerState}
              clue={clueText}
              latestPillCompleted={latestPillCompleted}
            />
          )}
        />
        <Route
          exact
          path="/barcode"
          render={() => (
            <BarcodePage
              pillError={pillError}
              pillState={pillState}
              showClue={toggleClue}
              latestPillCompleted={latestPillCompleted}
              subPillCounter={subPillCounter}
            />
          )}
        />
      </div>
    </Router>
  );
};
