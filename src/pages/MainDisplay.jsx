import React from "react";

export const MainDisplay = () => {
  const [isClueVisible, setIsClueVisible] = useState(false);

  const handleShowClue = (event) => {
    console.log(event);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="timer"></div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="clues" onClick={handleShowClue}></div>
        </div>
      </div>
    </div>
  );
};
