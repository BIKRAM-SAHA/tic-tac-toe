import { useEffect, useState } from "react";
import "../styles/Game.css";
import { calculateWin } from "../helpers/calculateWin";
import { minimax } from "../helpers/minimax";
import Board from "./Board";

function Game() {
  const [nextPlayer, setNextPlayer] = useState("X");
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [enableBestMove, setEnableBestMove] = useState(false);
  const [bestMove, setBestMove] = useState(null);

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
    setNextPlayer((nextPlayer) => (nextPlayer === "X" ? "O" : "X"));
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

  const toggleBestMove = () => {
    setEnableBestMove((prev) => !prev);
  };
  useEffect(() => {
    if (!enableBestMove) {
      setBestMove(null);
    } else {
      const val = minimax(history[stepNumber].squares);
      if (val[1]) {
        setBestMove(val);
      } else {
        setBestMove(null);
      }
    }
  }, [history, stepNumber, enableBestMove]);

  return (
    <div className="game">
      <h1 className="game-status">
        {winner
          ? winner === "Draw"
            ? "It is a Draw"
            : `Winner is ${winner}`
          : `Next Player: ${nextPlayer}`}
      </h1>
      <button onClick={reset}>Reset</button>
      <div>
        <input
          type="checkbox"
          checked={enableBestMove}
          onChange={toggleBestMove}
          id="bestMove"
        />
        <label htmlFor="bestMove">Show Best Move</label>
      </div>
      <Board
        boardState={boardState}
        onSquareClicked={onSquareClicked}
        bestMove={bestMove}
      />
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
