import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { TimerPage } from "./TimerPage";

class ViewManage extends Component {
  static Views() {
    return {
      control: <App />,
      timer: <TimerPage />,
    };
  }

  static View(props) {
    //get search param
    let name = props.location.search.substr(1); // minus ? from stirng
    if (name.includes("=")) {
      name = name.slice(0, name, indexOf("="));
    }
    let view = ViewManage.Views()[name]; //getting component from name
    if (view == null) throw new Error("View '" + name + "' is undefined");
    return view;
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" component={ViewManage.View} />
        </Routes>
      </Router>
    );
  }
}

export default ViewManage;
