import React from 'react';
import '../style.scss'
type SudokuBoardProps = {
  board: number[][];
};

const SudokuBoard  = ({ board } : SudokuBoardProps ) => {
    return (
      <div className="sudoku-board">
        {board.map((group, groupIndex) => (
          <div key={groupIndex} className="board-group">
            {group.map((cell, colIndex) => (
              <div key={colIndex} className="board-cell">
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default SudokuBoard;
