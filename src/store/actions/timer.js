import { TOGGLE_CLUE } from "../types/timer";

export const toggleShowClueAction = (isVisible) => {
  return {
    type: TOGGLE_CLUE,
    payload: isVisible,
  };
};
