import { useState } from "react";

import "./App.css";
type Disc = 1 | 2 | 0;
type Board = Disc[][];
const row = 6;
const col = 7;
const winScore = 4;

function App() {
  const [boardData, setBoardData] = useState<Board>();
  const initBoard = () => {
    let newBoard: Board = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        if (!newBoard[r]) {
          newBoard[r] = [];
        }
        newBoard[r].push(0);
      }
    }
    setBoardData(newBoard);
  };
  initBoard();

  return (
    <>
      <h1>Connect 4</h1>
    </>
  );
}

export default App;
