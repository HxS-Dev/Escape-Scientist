import React from "react";
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <ul>
        <Link to='/'>
            <li>Home</li>   
        </Link>
        <Link to='/about'>
            <li>About</li>   
        </Link>
        <Link to='/contact'>
            <li>Contact</li>   
        </Link>
        <Link to='/playground'>
            <li>Playground</li>   
        </Link>
        <Link to='/portfolio'>
            <li>Portfolio</li>   
        </Link>
    </ul>
  );
}

export default Nav;