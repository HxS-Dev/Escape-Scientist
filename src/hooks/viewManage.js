import { useState } from "react";
const { ipcRenderer } = window.require("electron");
import { HANDLE_TOGGLE_CLUE } from "../../helpers/ipcActions";

export const useViewManage = () => {
  const [toggleClue, setToggleClue] = useState(false);

  const handleToggleClue = () => {
    setToggleClue((prev) => !prev);
    ipcRenderer.send(HANDLE_TOGGLE_CLUE, toggleClue);
  };
  ipcRenderer.on(HANDLE_TOGGLE_CLUE, (event, toggleClue) => {
    setToggleClue(toggleClue);
  });

  return {
    handleToggleClue,
    toggleClue,
  };
};
