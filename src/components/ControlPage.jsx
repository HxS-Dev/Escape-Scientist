import "../assets/css/App.css";
import React, { useState } from "react";

export const ControlPage = ({ isClueVisible }) => {
  return <div>{isClueVisible && <h1>CLUE VIS</h1>}</div>;
};
