// * Dependencies
import React from "react";
import { Link } from "react-router-dom";
// * Components
import TransparentContainer from "./TransparentContainer";
//* Styles
import "./styles/Nav.scss";
import placeholderLogo from "../static/placeholderLogo.png";

function Nav() {
  return (
    <TransparentContainer additionalClasses="navbar">
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/">
            <img className="logo" src={placeholderLogo} alt="logo"></img>
          </Link>
        </li>
        <li>
          <Link to="/playground">Playground</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </TransparentContainer>
  );
}

export default Nav;
