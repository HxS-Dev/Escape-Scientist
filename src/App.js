// * styles
// * Components
import React from "react";
import "./App.scss";
import { MainDisplay } from "./pages/MainDisplay";
import { scanner } from "./scanner";
// * dependencies

function App() {
  const success = scanner();
  return <div>{success}</div>;
}

export default App;
