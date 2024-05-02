export default function Square({ value, onSquareClick, isWinningSquare }) {
  const className = isWinningSquare ? "square winning" : "square";
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}
