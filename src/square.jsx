import PropTypes from "prop-types";

Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired,
  isWinningSquare: PropTypes.bool,
};

export default function Square({ value, onSquareClick, isWinningSquare }) {
  const className = isWinningSquare ? "square winning" : "square";
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}
