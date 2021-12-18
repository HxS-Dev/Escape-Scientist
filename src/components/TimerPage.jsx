import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/App.css";
import { toggleShowClueAction } from "../store/actions/timer";
import { TOGGLE_CLUE } from "../store/types/timer";

export const TimerPage = ({}) => {
  const [toggleClue, setToggleClue] = useState(false);
  const { showClue } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  const handleShowClue = () => {
    setToggleClue((prevState) => !prevState);
    dispatch(toggleShowClueAction({ toggleClue }));
  };

  return (
    <div className="container">
      <h1>Timer {showClue}</h1>
      <button
        onClick={handleShowClue}
        type="button"
        className="btn btn-primary"
      >
        Primary
      </button>

      <div className="row">
        <div className="col">
          <div className="timer card"></div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="clues"></div>
        </div>
      </div>
    </div>
  );
};
