// * styles
// * Components
import React from "react";
import "./App.scss";
import { MainDisplay } from "./pages/MainDisplay";
import { scanner } from "./scanner";
// * dependencies

function App() {
  // const success = scanner();
  return <MainDisplay />;
}

export default App;
