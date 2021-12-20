import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ControlPage } from "./ControlPage.jsx";
import { BarcodePage } from "./BarcodePage.jsx";
import { TimerPage } from "./TimerPage.jsx";
import { useViewManage } from "../hooks/viewManage.js";
import "../assets/css/App.css";

export const ViewManage = () => {
  const {
    handleToggleClue,
    toggleClue,
    handlePauseTimer,
    handleStartTimer,
    handleRestartTimer,
    timerState,
  } = useViewManage();

  return (
    <Router>
      <div>
        <Route
          exact
          path="/control"
          render={() => (
            <ControlPage
              handleToggleClue={handleToggleClue}
              handlePauseTimer={handlePauseTimer}
              handleStartTimer={handleStartTimer}
              handleRestartTimer={handleRestartTimer}
              showClue={toggleClue}
            />
          )}
        />

        <Route
          exact
          path="/timer"
          render={() => (
            <TimerPage showClue={toggleClue} timerState={timerState} />
          )}
        />
        <Route exact path="/barcode" render={() => <BarcodePage />} />
      </div>
    </Router>
  );
};
