import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ControlPage } from "./ControlPage.jsx";
import { BarcodePage } from "./BarcodePage.jsx";
import { TimerPage } from "./TimerPage.jsx";

export const ViewManage = () => {
  return (
    <Router>
      <div>
        <Route exact path="/barcode" render={() => <BarcodePage />} />
        <Route exact path="/control" render={() => <ControlPage />} />
        <Route path="/timer" render={() => <TimerPage test="this is pro" />} />
      </div>
    </Router>
  );
};
