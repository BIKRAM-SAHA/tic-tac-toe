import "../styles/Square.css";

function Square({ index, bestMove, value, onClick }) {
  const prediction =
    bestMove && index === bestMove[1].pos ? bestMove[1].val : null;
  return (
    <div className="square">
      <button className="square-btn" onClick={onClick}>
        {prediction ? <div className="prediction">{prediction}</div> : value}
      </button>
    </div>
  );
}

export default Square;
