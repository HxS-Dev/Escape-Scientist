import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ControlPage } from "./ControlPage.jsx";
import { BarcodePage } from "./BarcodePage.jsx";
import { TimerPage } from "./TimerPage.jsx";

export const ViewManage = () => {
  const [isClueVisible, setIsClueVisible] = useState(false);
  console.log(isClueVisible);

  return (
    <Router>
      <div>
        <Route exact path="/timer" render={() => <TimerPage />} />
        <Route exact path="/control" render={() => <ControlPage />} />
        <Route exact path="/barcode" render={() => <BarcodePage />} />
      </div>
    </Router>
  );
};
