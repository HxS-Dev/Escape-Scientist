import React, { useState } from "react";

export const MainDisplay = ({ showClue }) => {
  // lifting the props move state to control display
  // provide app with scanner state using context api or alternative
  const [isClueVisible, setIsClueVisible] = useState(false);

  const handleShowClue = (event) => {
    console.log(event);
  };
  return (
    <div className="">
      <h1>sads</h1>
      <div className="timer"></div>
      <div className="row">
        <div className="col">
          <div className="clues"></div>
          <button
            type="button"
            onClick={handleShowClue}
            className="btn btn-primary"
          >
            Primary
          </button>
        </div>
      </div>
    </div>
  );
};
