import { calculateWin } from "./calculateWin";

const MAX_PLAYER = "X";
const MIN_PLAYER = "O";

const isTerminal = (state) => {
  if (calculateWin(state)) return true;
  return false;
};

const value = (state) => {
  //returns stepValue along with action to remember the action
  //MAX player wants to maximize
  //MIN player wants to minimize
  if (calculateWin(state) === MAX_PLAYER) {
    return 1;
  } else if (calculateWin(state) === MIN_PLAYER) {
    return -1;
  } else {
    return 0;
  }
};

const player = (state) => {
  //whose turn is this
  const noOfSteps = state.reduce((prevCnt, curr) => {
    if (curr) return prevCnt + 1;
    return prevCnt;
  }, 0);
  if (noOfSteps % 2 === 0) {
    return MAX_PLAYER;
  }
  return MIN_PLAYER;
};

const actions = (state) => {
  //return all possible actions: {pos, val}[]
  const nextPlayer = player(state);
  let actions = [];
  state.forEach((elem, index) => {
    if (!elem) {
      actions.push({ pos: index, val: nextPlayer });
    }
  });
  return actions;
};

const result = (state, action) => {
  //return new state after taking an action
  return state.map((elem, index) => {
    if (index === action.pos) {
      return action.val;
    }
    return elem;
  });
};

export const minimax = (state) => {
  if (isTerminal(state)) {
    return [value(state), null];
  }
  if (player(state) === MAX_PLAYER) {
    let maxVal = -Infinity;
    let bestMove = null;
    for (let action of actions(state)) {
      const evaluatedVal = minimax(result(state, action))[0];
      if (evaluatedVal > maxVal) {
        maxVal = evaluatedVal;
        bestMove = action;
      }
    }
    return [maxVal, bestMove];
  } else if (player(state) === MIN_PLAYER) {
    let minVal = Infinity;
    let bestMove = null;
    for (let action of actions(state)) {
      const evaluatedVal = minimax(result(state, action))[0];
      if (evaluatedVal < minVal) {
        minVal = evaluatedVal;
        bestMove = action;
      }
    }
    return [minVal, bestMove];
  }
};
