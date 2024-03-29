import React from "react";
import { render } from "react-dom";
import { ViewManage } from "./components/ViewManage.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");
root.id = "root";
let style = document.createElement("style");
document.body.appendChild(root);
document.head.appendChild(style);
style.innerHTML = "@import url('http://fonts.cdnfonts.com/css/bebas-neue')";

render(<ViewManage />, document.getElementById("root"));
