import { useState } from "react";
import { Board, row, col } from "./types/constants";
import "./App.css";
import GameBoard from "./components/Board";

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
  return newBoard;
};

function App() {
  const [boardData, setBoardData] = useState<Board>(() => initBoard());
  return (
    <>
      <h1>Connect 4</h1>
      <GameBoard boardData={boardData} />
    </>
  );
}

export default App;
