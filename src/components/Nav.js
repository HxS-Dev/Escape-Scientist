// * Dependencies
import React from "react";
import { Link } from "react-router-dom";
// * Components
import TransparentContainer from "./TransparentContainer";
//* Styles
import "./styles/Nav.scss";
function Nav() {
  return (
    <TransparentContainer additionalClasses="navbar">
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
        <Link to="/playground">
          <li>Playground</li>
        </Link>
        <Link to="/portfolio">
          <li>Portfolio</li>
        </Link>
      </ul>
    </TransparentContainer>
  );
}

export default Nav;
