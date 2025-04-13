import { useState } from "react";
import { Board, row, col, Cell } from "./types/constants";
import "./App.css";
import GameBoard from "./components/Board";

const initBoard = () => {
  let newBoard: Board = Array(col)
    .fill(null)
    .map(() => Array(row).fill(0));
  return newBoard;
};

const findAvailableRow = (selectedColumn: Cell[]) => {
  for (let r = 0; r < selectedColumn.length; r++) {
    if (selectedColumn[r] === 0) {
      return r;
    }
  }
};

function App() {
  const [boardData, setBoardData] = useState<Board>(() => initBoard());
  const [playerTurn, setPlayerTurn] = useState<Cell>(1);

  const handlePlay = (colIndex: number) => {
    const selectedColumn = boardData[colIndex];
    const availableRow = findAvailableRow(selectedColumn);
    console.log(colIndex, availableRow);
  };

  return (
    <>
      <h1>Connect 4</h1>
      <h2>{`Player ${playerTurn}'s turn`}</h2>
      <GameBoard boardData={boardData} onColumnClick={handlePlay} />
    </>
  );
}

export default App;
