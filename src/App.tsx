import { useMemo, useState } from "react";
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

  const disabledCols = useMemo(() => {
    const fullCols: number[] = [];
    boardData.forEach((col, colIndex) => {
      if (col[0] !== 0) {
        fullCols.push(colIndex);
      }
    });
    return fullCols;
  }, [boardData]);

  const checkWin = (colIndex: number, availableRow: number) => {
    const checkVertical = () => {
      // Check Down
      let c = 1;
      let step = 1;
      while (
        step < 4 &&
        availableRow + step >= 0 &&
        boardData[colIndex][availableRow + step] === playerTurn
      ) {
        c++;
        step++;
      }

      step = 1;
      while (
        step < 4 &&
        availableRow - step <= 5 &&
        boardData[colIndex][availableRow - step] === playerTurn
      ) {
        c++;
        step++;
      }
      if (c === 4) {
        return true;
      } else {
        return false;
      }
    };

    const checkHorizontal = () => {
      let c = 1;
      let step = 1;

      // Check Left
      while (
        step < 4 &&
        colIndex - step >= 0 &&
        boardData[colIndex - step][availableRow] === playerTurn
      ) {
        c++;
        step++;
      }

      step = 1;
      // Check Right
      while (
        step < 4 &&
        colIndex + step <= 6 &&
        boardData[colIndex + step][availableRow] === playerTurn
      ) {
        c++;
        step++;
      }

      if (c === 4) {
        return true;
      } else {
        return false;
      }
    };

    if (checkHorizontal() || checkVertical()) {
      console.log(`Player ${playerTurn} Wins!`);
    }
  };

  const handlePlay = (colIndex: number) => {
    const selectedColumn = boardData[colIndex];
    const availableRow = findAvailableRow(selectedColumn);

    if (disabledCols.includes(colIndex)) {
      return;
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
    checkWin(colIndex, availableRow);

    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };

  return (
    <>
      <h1>Connect 4</h1>
      <h2>{`Player ${playerTurn}'s turn`}</h2>
      <GameBoard
        boardData={boardData}
        onColumnClick={handlePlay}
        isDisabled={disabledCols}
      />
    </>
  );
}

export default App;
