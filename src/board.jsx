import Square from "./square";

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  const winningLine = winner ? winner.winnersLine : null;

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "❌") : (nextSquares[i] = "⭕️");
    onPlay(nextSquares);
  }

  const boardRow = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      const isWinningSquare = winningLine && winningLine.includes(squareIndex);
      squaresInRow.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          isWinningSquare={isWinningSquare}
        />
      );
    }
    boardRow.push(
      <div key={row} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="board">{boardRow}</div>
    </>
  );
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnersLine: lines[i] };
    }
  }
  return null;
}
