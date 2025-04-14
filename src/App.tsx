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

const countLine = (
  board: Board,
  startCol: number,
  startRow: number,
  dc: number,
  dr: number,
  player: Cell
): number => {
  let count = 0;
  let colIndex = startCol + dc;
  let colRow = startRow + dr;

  while (
    colIndex >= 0 &&
    colIndex < board.length &&
    colRow >= 0 &&
    colRow < board[colIndex].length &&
    board[colIndex][colRow] === player
  ) {
    count++;
    colIndex += dc;
    colRow += dr;
  }

  return count;
};

function App() {
  const [boardData, setBoardData] = useState<Board>(() => initBoard());
  const [playerTurn, setPlayerTurn] = useState<Cell>(1);
  const [isWinner, setIsWinner] = useState<Cell>(0);
  const [isDraw, setIsDraw] = useState(false);

  const disabledCols = useMemo(() => {
    const fullCols: number[] = [];
    boardData.forEach((col, colIndex) => {
      if (isWinner > 0) {
        fullCols.push(colIndex);
      } else {
        if (col[0] !== 0) {
          fullCols.push(colIndex);
        }
      }
    });
    return fullCols;
  }, [boardData, isWinner]);

  const checkWin = (board: Board, colIndex: number, availableRow: number) => {
    const player = board[colIndex][availableRow];

    if (player === 0) return;

    const directions: [number, number][] = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ];

    for (let [dc, dr] of directions) {
      let forward = countLine(board, colIndex, availableRow, dc, dr, player);
      let backward = countLine(board, colIndex, availableRow, -dc, -dr, player);

      if (forward + backward + 1 >= 4) {
        return true;
      }
    }
    return false;
  };

  const handlePlay = (colIndex: number) => {
    const selectedColumn = boardData[colIndex];
    const availableRow = findAvailableRow(selectedColumn);

    if (isWinner > 0 || disabledCols.includes(colIndex)) {
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

    if (checkWin(nextBoard, colIndex, availableRow)) {
      setIsWinner(playerTurn);
      return;
    }

    const allPositionsFull = nextBoard.every((col) =>
      col.every((cell) => cell !== 0)
    );
    if (allPositionsFull) {
      setIsDraw(true);
      return;
    }

    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };

  return (
    <>
      <h1>Connect 4</h1>
      {isDraw ? (
        <h2>It's a draw!</h2>
      ) : isWinner > 0 ? (
        <h2>{`Player ${isWinner} wins!`}</h2>
      ) : (
        <h2>{`Player ${playerTurn}'s turn`}</h2>
      )}
      <GameBoard
        boardData={boardData}
        onColumnClick={handlePlay}
        isDisabled={disabledCols}
      />
    </>
  );
}

export default App;
