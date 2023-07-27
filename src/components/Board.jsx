import "../styles/Board.css";
import Square from "./Square";

function Board({ boardState, onSquareClicked, bestMove }) {
  const board = [
    {
      value: boardState[0],
      clickHandler: () => {
        onSquareClicked(0);
      },
    },
    {
      value: boardState[1],
      clickHandler: () => {
        onSquareClicked(1);
      },
    },
    {
      value: boardState[2],
      clickHandler: () => {
        onSquareClicked(2);
      },
    },
    {
      value: boardState[3],
      clickHandler: () => {
        onSquareClicked(3);
      },
    },
    {
      value: boardState[4],
      clickHandler: () => {
        onSquareClicked(4);
      },
    },
    {
      value: boardState[5],
      clickHandler: () => {
        onSquareClicked(5);
      },
    },
    {
      value: boardState[6],
      clickHandler: () => {
        onSquareClicked(6);
      },
    },
    {
      value: boardState[7],
      clickHandler: () => {
        onSquareClicked(7);
      },
    },
    {
      value: boardState[8],
      clickHandler: () => {
        onSquareClicked(8);
      },
    },
  ];
  return (
    <div className="board">
      {board.map((item, index) => (
        <Square
          index={index}
          bestMove={bestMove}
          value={item.value}
          onClick={item.clickHandler}
          key={index}
        />
      ))}
    </div>
  );
}

export default Board;
