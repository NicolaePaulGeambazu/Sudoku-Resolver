"use client"
import React, { useState } from 'react';
import SudokuBoard from './pages/SudokuBoard';
import '../app/style.scss';
import SuccessPopup from './SuccessPopUp';

type SudokuBoardType = number[][];

const Home = () => {
  const initialBoard: SudokuBoardType = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 6, 0, 7, 9],
  ];
  const [board, setBoard] = useState<SudokuBoardType>(initialBoard);
  const [showPopup, setShowPopup] = useState(false);

  const handleSolveClick = () => {
    const copyBoard = JSON.parse(JSON.stringify(board));

    if (solveSudoku(copyBoard)) {
      setBoard(copyBoard);
    } else {
      console.error('Unsolvable Sudoku!');
    }
  };
  const handleResetClick = () => {
    setBoard(initialBoard);
    setShowPopup(false);
  };
  const solveSudoku = (board: SudokuBoardType): boolean => {
    const emptyCell = findEmptyCell(board);

    if (!emptyCell) {
      return true;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;

        if (solveSudoku(board)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  };

  const findEmptyCell = (board: SudokuBoardType): [number, number] | null => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    setShowPopup(!showPopup);
    return null;
    
  };

  const isValidMove = (
    board: SudokuBoardType,
    row: number,
    col: number,
    num: number
  ): boolean => {
    return (
      !usedInRow(board, row, num) &&
      !usedInColumn(board, col, num) &&
      !usedInBox(board, row - (row % 3), col - (col % 3), num)
    );
  };

  const usedInRow = (board: SudokuBoardType, row: number, num: number): boolean => {
    return board[row].includes(num);
  };

  const usedInColumn = (board: SudokuBoardType, col: number, num: number): boolean => {
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  };

  const usedInBox = (
    board: SudokuBoardType,
    boxStartRow: number,
    boxStartCol: number,
    num: number
  ): boolean => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row + boxStartRow][col + boxStartCol] === num) {
          return true;
        }
      }
    }
    return false;
  };
  const handleClosePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="container">
      <h1>Sudoku Solver</h1>
      <SudokuBoard board={board} />
      <div className="button-container">
        <button onClick={handleSolveClick} className="solve-button">Solve</button>
        <button onClick={handleResetClick} className="reset-button">
            Reset
          </button>
      </div>
      <SuccessPopup show={showPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default Home;
