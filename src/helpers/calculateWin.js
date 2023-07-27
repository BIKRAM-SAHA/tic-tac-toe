export const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const calculateWin = (state) => {
  //returns 'X' | 'O' | 'Draw' | null
  for (const [a, b, c] of lines) {
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a];
    }
  }
  if (!state.includes(null)) return "Draw";
  return null;
};
