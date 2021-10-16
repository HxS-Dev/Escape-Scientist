import React from "react";
import Particles from "../../node_modules/react-particles-js";

function Playground() {
  return (
    <div>
      <Particles
        style={{
          position: "absolute",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      ></div>
    </div>
  );
}

export default Playground;
