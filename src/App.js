// * styles
import "./App.scss";
// * Components
import React from "react";
import Nav from "./components/Nav";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Portfolio from "./pages/Portfolio";
import MobileNav from "./components/MobileNav";
// * dependencies
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />
      <MobileNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/portfolio" component={Portfolio} />
        {/* protected routes will come in at some point */}
        <Route path="/playground" component={Playground} />
      </Switch>
    </Router>
  );
}

export default App;
