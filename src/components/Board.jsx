import "../styles/Board.css";
import Square from "./Square";

function Board({ boardState, onSquareClicked }) {
  return (
    <div className="board">
      <Square
        value={boardState[0]}
        onClick={() => {
          onSquareClicked(0);
        }}
      />
      <Square
        value={boardState[1]}
        onClick={() => {
          onSquareClicked(1);
        }}
      />
      <Square
        value={boardState[2]}
        onClick={() => {
          onSquareClicked(2);
        }}
      />
      <Square
        value={boardState[3]}
        onClick={() => {
          onSquareClicked(3);
        }}
      />
      <Square
        value={boardState[4]}
        onClick={() => {
          onSquareClicked(4);
        }}
      />
      <Square
        value={boardState[5]}
        onClick={() => {
          onSquareClicked(5);
        }}
      />
      <Square
        value={boardState[6]}
        onClick={() => {
          onSquareClicked(6);
        }}
      />
      <Square
        value={boardState[7]}
        onClick={() => {
          onSquareClicked(7);
        }}
      />
      <Square
        value={boardState[8]}
        onClick={() => {
          onSquareClicked(8);
        }}
      />
    </div>
  );
}

export default Board;
