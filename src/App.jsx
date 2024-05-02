import { useEffect, useState } from "react";
import "./App.css";
import Square from "./square";

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "❌") : (nextSquares[i] = "⭕️");
    onPlay(nextSquares);
  }

  const boardRow = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      squaresInRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscendingOrder, setAscendingOrder] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [status, setStatus] = useState("Next player: ❌");

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // 副作用
  useEffect(() => {
    const winner = calculateWinner(currentSquares)
      ? calculateWinner(currentSquares).winner
      : null;

    if (winner) {
      setStatus("Winner: " + winner);
    } else {
      setStatus("Next player: " + (xIsNext ? "❌" : "⭕️"));
    }
  }, [currentSquares]);

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = getDescription(move, currentMove);

    const isLatestMove = move === currentMove;

    const attachStyle = isLatestMove
      ? "game-info-button current-move"
      : "game-info-button";

    return (
      <li key={move}>
        <button className={attachStyle} onClick={() => jumpTo(move)}>
          {" "}
          {description}{" "}
        </button>
      </li>
    );
  });

  function changeSort() {
    setAscendingOrder(!isAscendingOrder);
  }

  const sortedMoves = isAscendingOrder ? moves : moves.reverse();

  return (
    <div className="game">
      <header className="status">{status}</header>
      <div className="container">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <button className="game-info-button" onClick={() => changeSort()}>
            {"Change Sort"}
          </button>
          <ol className="game-info-list">{sortedMoves}</ol>
        </div>
      </div>
    </div>
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

const getDescription = (move, currentMove) => {
  if (move === currentMove) {
    return "You are at move #" + move;
  } else if (move > 0) {
    return "Go to move #" + move;
  } else {
    return "Go to game start";
  }
};
