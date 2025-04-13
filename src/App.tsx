import { useState } from "react";
import { Board, row, col, Disc } from "./consts";
import "./App.css";
import GameBoard from "./components/GameBoard";

const initBoard: Board = Array(row)
  .fill(0)
  .map(() => Array(col).fill(0 as Disc));

function App() {
  const [boardData, setBoardData] = useState<Board>(initBoard);
  return (
    <>
      <h1>Connect 4</h1>
      <GameBoard boardData={boardData} />
    </>
  );
}

export default App;
