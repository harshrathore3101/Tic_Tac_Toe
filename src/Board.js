import React from "react";
import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9));
  
  const [xIsNext, setxIsNext] = useState(true);

  const Reset = () => {
    setSquares(squares.map((x) => null));
    setxIsNext(true);
  };

  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const heandleClick = (i) => {
    const square = squares.slice();
    if (square[i] || calculateWinner(square)) {
      return;
    }
    square[i] = xIsNext ? "X" : "O";
    setSquares(square);
    setxIsNext(!xIsNext);
  };
  // console.log(squares);
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => heandleClick(i)} />;
  };
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winnent :${winner}`;
  } else {
    status = `Next Player:${xIsNext ? "X" : "O"}`;
  }
  return (
    <>
      <div className="status">{status}</div>
      <button onClick={() => Reset()}>Reset</button>

      <div className="game">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </>
  );
};

export default Board;
