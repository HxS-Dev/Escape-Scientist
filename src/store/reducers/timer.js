import { TOGGLE_CLUE } from "../types/timer";

//return a new object in the reducer, no value changes, we need a complete new object
const initialState = {
  showClue: null,
};

export const timerReducer = (
  state = initialState,
  { type, payload: { toggleClue } }
) => {
  switch (type) {
    case TOGGLE_CLUE:
      return {
        showClue: toggleClue,
      };
    default:
      return state;
  }
};
