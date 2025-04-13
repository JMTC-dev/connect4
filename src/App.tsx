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
  for (let r = selectedColumn.length - 1; r >= 0; r--) {
    if (selectedColumn[r] === 0) {
      return r;
    }
  }
  return -1;
};

function App() {
  const [boardData, setBoardData] = useState<Board>(() => initBoard());
  const [playerTurn, setPlayerTurn] = useState<Cell>(1);
  const [isDisabled, setIsDisabled] = useState<number[]>([]);

  const handlePlay = (colIndex: number) => {
    const selectedColumn = boardData[colIndex];
    const availableRow = findAvailableRow(selectedColumn);

    if (availableRow === -1) {
      const nextIsDisabled = [...isDisabled];
      nextIsDisabled.push(colIndex);
      return setIsDisabled(nextIsDisabled);
    }

    console.log(colIndex, availableRow);

    const nextBoard = boardData.map((col, i) => {
      if (i === colIndex) {
        const newCol = [...col];
        newCol[availableRow] = playerTurn;
        return newCol;
      } else {
        return col;
      }
    });

    setBoardData(nextBoard);

    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };

  return (
    <>
      <h1>Connect 4</h1>
      <h2>{`Player ${playerTurn}'s turn`}</h2>
      <GameBoard
        boardData={boardData}
        onColumnClick={handlePlay}
        isDisabled={isDisabled}
      />
    </>
  );
}

export default App;
