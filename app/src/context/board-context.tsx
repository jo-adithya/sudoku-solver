import React, { createContext, useRef } from "react";
import { Pos } from "../models/Pos";
import {
  Board,
  create2DArray,
  createIndexes,
  solveBoard,
  getIndexes,
  IndexInterface,
} from "../utils/helpers";
import { UnitState } from "../utils/unitStyle";

interface BoardContextInterface {
  size: number;
  board: Board;
  refs: any; // TODO: remove any
  activeUnit: Pos | null;
  setActiveUnit: (pos: Pos | null) => void;
  setUnitValue: (value: number | "", unit: Pos) => void;
  findErrors: (value: number | "", pos: Pos) => Pos[];
  removeErrors: (errors: Pos[], pos: Pos) => void;
  solve: (speed: number) => Promise<boolean>;
}

export const BoardContext = createContext<BoardContextInterface | undefined>(
  undefined
);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const size = 3;
  const board = useRef<Board>(create2DArray<"">(size * size, ""));
  const refs = useRef(create2DArray<any>(size * size, null));
  const activeUnit = useRef<Pos | null>(null);
  const indexes = createIndexes(size * size);

  const handleUnitInput = (value: number | "", unit: Pos) => {
    board.current[unit.i][unit.j] = value;
    refs.current[unit.i][unit.j].changeUnitValue(value);
  };

  const updateBoard = async (bd: Board) => {
    for (let i = 0, n = size * size; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board.current[i][j] === bd[i][j]) continue;
        handleUnitInput(bd[i][j], new Pos(i, j));
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }
  };

  const setUnitsState = (
    pos: Pos,
    stateToAdd: UnitState | null,
    stateToRemove: UnitState | null
  ) => {
    const { row, col, box } = getIndexes(indexes, pos);
    for (let i = 0, n = row.length; i < n; i++) {
      refs.current[row[i].i][row[i].j].setState(stateToAdd, stateToRemove);
      refs.current[col[i].i][col[i].j].setState(stateToAdd, stateToRemove);
      refs.current[box[i].i][box[i].j].setState(stateToAdd, stateToRemove);
    }
  };

  const setActiveUnit = async (pos: Pos) => {
    const currPos = activeUnit.current;
    if (currPos !== null) {
      refs.current[currPos.i][currPos.j].setState(null, UnitState.Active);
      await setUnitsState(currPos, null, UnitState.CoActive);
    }
    activeUnit.current = pos;
    setUnitsState(pos, UnitState.CoActive, null);
    refs.current[pos.i][pos.j].setState(UnitState.Active, UnitState.CoActive);
  };

  const findErrors = (val: number | "", pos: Pos): Pos[] => {
    if (val === "") return [];

    const length = indexes.col.length;
    const { row, col, box } = getIndexes(indexes, pos);
    let errors: Pos[] = [];

    const addError = (errors: Pos[], pos: Pos) => {
      for (let i = 0, n = errors.length; i < n; i++) {
        if (+errors[i] === +pos) return;
      }
      errors.push(pos);
    };

    for (let i = 0; i < length; i++) {
      if (+row[i] !== +pos && board.current[row[i].i][row[i].j] === val) {
        addError(errors, row[i]);
        refs.current[row[i].i][row[i].j].addError(pos);
      }
      if (+col[i] !== +pos && board.current[col[i].i][col[i].j] === val) {
        addError(errors, col[i]);
        refs.current[col[i].i][col[i].j].addError(pos);
      }
      if (+box[i] !== +pos && board.current[box[i].i][box[i].j] === val) {
        addError(errors, box[i]);
        refs.current[box[i].i][box[i].j].addError(pos);
      }
    }

    return errors;
  };

  const removeErrors = (errors: Pos[], pos: Pos) => {
    for (let i = 0, n = errors.length; i < n; i++)
      refs.current[errors[i].i][errors[i].j].removeError(pos);
  };

  const contextValue = {
    size: size,
    board: board.current,
    refs: refs,
    activeUnit: activeUnit.current,
    setActiveUnit: setActiveUnit,
    setUnitValue: handleUnitInput,
    findErrors: findErrors,
    removeErrors: removeErrors,
    solve: (speed) => solveBoard(board.current, updateBoard, indexes, speed),
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};
