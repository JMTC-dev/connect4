import { Board, Cell } from "../types/constants";
import styles from "./Board.module.css";

interface GameBoardProps {
  boardData: Board;
  onColumnClick: (colIndex: number) => void;
}

const GameBoard = ({ boardData, onColumnClick }: GameBoardProps) => {
  return (
    <>
      <div className={`${styles.gameboard}`}>
        {boardData.map((col, colIndex) => (
          <button
            key={`col-${colIndex}`}
            className={styles.col}
            tabIndex={0}
            onClick={() => onColumnClick(colIndex)}
          >
            {col.map((row, rowIndex) => (
              <div
                key={`col-${colIndex}-row-${rowIndex}`}
                className={`${styles.cell}`}
              >
                {row}
              </div>
            ))}
          </button>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
