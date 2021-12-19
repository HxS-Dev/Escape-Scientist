import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const { ipcRenderer } = window.require("electron");
import { ControlPage } from "./ControlPage.jsx";
import { BarcodePage } from "./BarcodePage.jsx";
import { TimerPage } from "./TimerPage.jsx";
import { HANDLE_TOGGLE_CLUE } from "../../helpers/ipcActions.js";

export const ViewManage = () => {
  const [toggleClue, setToggleClue] = useState(false);

  const handleToggleClue = () => {
    setToggleClue((prev) => !prev);
    ipcRenderer.send(HANDLE_TOGGLE_CLUE, toggleClue);
  };
  ipcRenderer.on(HANDLE_TOGGLE_CLUE, (event, toggleClue) => {
    setToggleClue(toggleClue);
  });

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
