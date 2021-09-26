import React from "react";
import Particles from 'react-particles-js';

function Playground() {
  return (
    <div>
      <Particles style={{
        position: "absolute",
        zIndex: 1
      }}/>
      <div style={{
        position: "relative",
        zIndex: 2
      }}>
        <h1>Playground Page</h1>
      </div>
    </div>
  );
}

export default Playground;