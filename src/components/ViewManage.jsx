import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ControlPage } from "./ControlPage.jsx";
import { BarcodePage } from "./BarcodePage.jsx";
import { TimerPage } from "./TimerPage.jsx";
import { HANDLE_TOGGLE_CLUE } from "../../helpers/ipcActions.js";
import { useViewManage } from "../hooks/viewManage.js";

export const ViewManage = () => {
  const { handleToggleClue, toggleClue } = useViewManage();

  return (
    <Router>
      <div>
        <Route
          exact
          path="/control"
          render={() => <ControlPage handleToggleClue={handleToggleClue} />}
        />
        <Route
          exact
          path="/timer"
          render={() => <TimerPage showClue={toggleClue} />}
        />
        <Route exact path="/barcode" render={() => <BarcodePage />} />
      </div>
    </Router>
  );
};
