import { Board } from "../types/constants";
import styles from "./Board.module.css";

interface GameBoardProps {
  boardData: Board;
}

const GameBoard = ({ boardData }: GameBoardProps) => {
  return (
    <div className={`${styles.gameboard}`}>
      {boardData.map((col, colIndex) => (
        <div key={`col-${colIndex}`} className={styles.col} tabIndex={0}>
          {col.map((row, rowIndex) => (
            <div
              key={`col-${colIndex}-row-${rowIndex}`}
              className={`${styles.cell}`}
            >
              {row}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
