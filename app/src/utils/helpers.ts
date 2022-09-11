import { Pos } from '../models/Pos';

export type Board = (number | '')[][];

export interface IndexInterface {
  row: Pos[][];
  col: Pos[][];
  box: Pos[][];
}

export const solveBoard = async (
  board: Board,
  updateBoard: (board: Board) => Promise<void>,
  indexes: IndexInterface
) => {
  const solveBd = async (board: Board): Promise<boolean> => {
    await updateBoard(board);

    // Board is solved
    if (solved(board)) return true;

    let boards: Board[] = [];
    let pos = findEmptySpot(board);
    for (let i = 1; i <= 9; i++) {
      let newBoard = JSON.parse(JSON.stringify(board));
      if (!isValid(indexes, newBoard, i, pos)) continue;
      newBoard[pos.i][pos.j] = i;
      boards.push(newBoard);
    }

    return await solveBoards(boards);
  };

  const solveBoards = async (boards: Board[]): Promise<boolean> => {
    if (boards.length === 0) return false;
    if (await solveBd(boards[0])) return true;
    return await solveBoards(boards.slice(1));
  };

  return await solveBd(board);
};

// Solving Board Helpers
const solved = (board: Board): boolean => {
  return board.filter((unit) => unit.includes('')).length === 0;
};

const isValid = (
  indexes: IndexInterface,
  board: Board,
  val: number,
  pos: Pos
): boolean => {
  const length = indexes.col.length;
  const { row, col, box } = getIndexes(indexes, pos);

  for (let i = 0; i < length; i++) {
    if (board[row[i].i][row[i].j] === val) return false;
    if (board[col[i].i][col[i].j] === val) return false;
    if (board[box[i].i][box[i].j] === val) return false;
  }

  return true;
};

export const getIndexes = (indexes: IndexInterface, pos: Pos) => {
  const index = indexes.row[pos.i][pos.j];
  const length = indexes.col.length;
  let row = indexes.row[pos.i];
  let col: Pos[] = [];
  let box: Pos[] = [];

  // Get the necessary indexes for checking rows, cols, and boxes
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (+indexes.col[i][j] === +index) col = indexes.col[i];
      if (+indexes.box[i][j] === +index) box = indexes.box[i];
      if (col.length !== 0 && box.length !== 0) break;
    }
    if (col.length !== 0 && box.length !== 0) break;
  }

  return { row, col, box };
};

export const findEmptySpot = (board: Board): Pos => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '') return new Pos(i, j);
    }
  }
};

export const create2DArray = <T>(size: number, value: T): T[][] => {
  let arr = [] as T[][];
  for (var i = 0; i < size; i++) {
    arr[i] = [];
    for (var j = 0; j < size; j++) {
      arr[i][j] = value;
    }
  }
  return arr;
};

export const createIndexes = (size: number): IndexInterface => {
  // Create Row and Column Indexes
  let rowIdx: Pos[][] = [];
  let colIdx: Pos[][] = [];
  for (let i = 0; i < size; i++) {
    let row: Pos[] = [];
    let col: Pos[] = [];
    for (let j = 0; j < size; j++) {
      row.push(new Pos(i, j));
      col.push(new Pos(j, i));
    }
    rowIdx.push(row);
    colIdx.push(col);
  }

  // Create Box Indexes
  const sqrtSize = Math.sqrt(size);
  let boxIdx: Pos[][] = [];
  for (let i = 0; i < size; i++) {
    let box: Pos[] = [];
    let iRow = Math.floor(i / sqrtSize) * sqrtSize;
    let jRow = (i % sqrtSize) * sqrtSize;
    for (let j = 0; j < size; j++) {
      box.push(new Pos(iRow + Math.floor(j / sqrtSize), jRow + (j % sqrtSize)));
    }
    boxIdx.push(box);
  }

  return { row: rowIdx, col: colIdx, box: boxIdx };
};
