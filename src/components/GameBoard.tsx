import { Board } from "../consts";

interface GameBoardProps {
  boardData: Board;
}

const GameBoard = ({ boardData }: GameBoardProps) => {
  return <div className="game-board"></div>;
};

export default GameBoard;
