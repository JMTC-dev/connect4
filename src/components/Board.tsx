import { Board, Cell } from "../types/constants";
import styles from "./Board.module.css";

interface GameBoardProps {
  boardData: Board;
  onColumnClick: (colIndex: number) => void;
  isDisabled: number[];
}

const handleCellClass = (rowValue: number) => {
  switch (rowValue) {
    case 0:
      return `${styles.cell}`;
    case 1:
      return `${styles.cell} ${styles.playerOne}`;
    case 2:
      return `${styles.cell} ${styles.playerTwo}`;
  }
};

const GameBoard = ({
  boardData,
  onColumnClick,
  isDisabled,
}: GameBoardProps) => {
  return (
    <>
      <div className={`${styles.gameboard}`}>
        {boardData.map((col, colIndex) =>
          isDisabled.includes(colIndex) ? (
            <button
              key={`col-${colIndex}`}
              className={`${styles.col} ${styles.btnDisable}`}
              disabled={true}
            >
              {col.map((row, rowIndex) => (
                <div
                  key={`col-${colIndex}-row-${rowIndex}`}
                  className={handleCellClass(row)}
                ></div>
              ))}
            </button>
          ) : (
            <button
              key={`col-${colIndex}`}
              className={`${styles.col}`}
              onClick={() => onColumnClick(colIndex)}
            >
              {col.map((row, rowIndex) => (
                <div
                  key={`col-${colIndex}-row-${rowIndex}`}
                  className={handleCellClass(row)}
                ></div>
              ))}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default GameBoard;
