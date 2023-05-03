import { useState } from "react";
import "../styles/Game.css";
import Board from "./Board";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWin = (currSquares) => {
  for (const [a, b, c] of lines) {
    if (
      currSquares[a] &&
      currSquares[a] === currSquares[b] &&
      currSquares[a] === currSquares[c]
    ) {
      return currSquares[a];
    }
  }
  return null;
};

function Game() {
  const [nextPlayer, setNextPlayer] = useState("X");
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);

  const boardState = history[stepNumber].squares;
  const winner = calculateWin(boardState);

  const onSquareClicked = (squareId) => {
    // nothing happens if someone won or the sq was already clicked
    if (winner || boardState[squareId]) return;

    // otherwise "X" or "O" appears
    let newBoardState = [...boardState];
    newBoardState[squareId] = nextPlayer;
    setHistory(
      history.slice(0, stepNumber + 1).concat({ squares: newBoardState })
    );
    setNextPlayer(nextPlayer === "X" ? "O" : "X");
    setStepNumber((prev) => prev + 1);
  };

  const jumpTo = (stepNo) => {
    setStepNumber(stepNo);
    //assuming "X" plays first
    setNextPlayer(stepNo % 2 ? "O" : "X");
  };

  const reset = () => {
    setStepNumber(0);
    setNextPlayer("X");
    setHistory([{ squares: Array(9).fill(null) }]);
  };

  return (
    <div className="game">
      <h1 className="game-status">
        {winner ? `Winner is ${winner}` : `Next Player: ${nextPlayer}`}
      </h1>
      <button onClick={reset}>Reset</button>
      <Board boardState={boardState} onSquareClicked={onSquareClicked} />
      <ul className="history">
        {history.map((step, move) => {
          const description = move ? `Go to move ${move}` : "Go to Game Start";
          return (
            <li
              className={`step ${move === stepNumber ? "active" : ""}`}
              key={move}
              onClick={() => jumpTo(move)}
            >
              {description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Game;
