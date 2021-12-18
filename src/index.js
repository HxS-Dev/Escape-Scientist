import React from "react";
import { render } from "react-dom";
import { ViewManage } from "./components/ViewManage.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { reducers } from "./store/store.js";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import {
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from "electron-redux";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

store;
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(forwardToRenderer)
);
replayActionMain(store);
replayActionRenderer(store);

// Now we can render our application into it
render(
  <Provider store={store}>
    <ViewManage />
  </Provider>,
  document.getElementById("root")
);
