import React, { useState } from "react";

export const MainDisplay = ({ showClue }) => {
  // lifting the props move state to control display
  // provide app with scanner state using context api or alternative
  const [isClueVisible, setIsClueVisible] = useState(false);

  const handleShowClue = (event) => {
    console.log(event);
  };
  return (
    <div className="container-fluid">
      <div className="timer"></div>
      <div className="row">
        <div className="col">
          <div className="clues" onClick={handleShowClue}></div>
        </div>
      </div>
    </div>
  );
};
