import React, {
  useContext,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { BoardContext } from '../context/board-context';
import { Pos } from '../models/Pos';
import { getStyle, UnitState } from '../utils/unitStyle';

import './Unit.css';

type UnitProps = {
  unit: Pos;
};

export type UnitHandle = {
  changeUnitValue: (value: '' | number) => void;
};

export const Unit = forwardRef<UnitHandle, UnitProps>(({ unit }, ref) => {
  const [value, setValue] = useState<number | ''>('');
  const [errors, setErrors] = useState<Pos[]>([]);
  const [states, setStates] = useState<Set<UnitState>>(
    new Set<UnitState>([UnitState.Normal])
  );
  const boardCtx = useContext(BoardContext);

  const handleChange = (e: React.KeyboardEvent) => {
    let newVal = e.key;

    if (newVal === 'Backspace') {
      boardCtx.removeErrors(boardCtx.findErrors(value, unit), unit);
      boardCtx.setUnitValue('', unit);
      setErrors([]);
      return;
    }

    // Check if inserted value is valid (in range 1 - 9)
    if (!new RegExp(`^[1-${Math.pow(boardCtx.size, 2)}]$`).test(newVal)) return;

    // Do nothing if the inserted value is the same as before
    if (boardCtx.board[unit.i][unit.j] === +newVal) return;

    // Check if the inserted value has conflicts with other part of the board
    boardCtx.removeErrors(boardCtx.findErrors(value, unit), unit);
    setErrors(boardCtx.findErrors(+newVal, unit));

    boardCtx.setUnitValue(+newVal, unit);
  };

  const setState = (
    stateToAdd: UnitState | null,
    stateToRemove: UnitState | null
  ) => {
    if (states.has(stateToAdd) && !states.has(stateToRemove)) return;
    setStates((prevState) => {
      let newState: Set<UnitState> = new Set(
        JSON.parse(JSON.stringify(Array.from(prevState)))
      );
      newState.add(stateToAdd);
      newState.delete(stateToRemove);
      return newState;
    });
  };

  const handleClick = () => {
    boardCtx.setActiveUnit(unit);
  };

  useEffect(() => {
    if (errors.length === 0) setState(null, UnitState.Error);
    else setState(UnitState.Error, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useImperativeHandle(ref, () => ({
    changeUnitValue(value: '' | number) {
      setValue(value);
    },
    setState: setState,
    addError(pos: Pos) {
      setErrors((err) => [...err, pos]);
    },
    removeError(pos: Pos) {
      setErrors((err) => err.filter((e: Pos) => +e !== +pos));
    },
  }));

  return (
    <input
      className="unit"
      style={getStyle(states)}
      type="text"
      value={value}
      onKeyDown={handleChange}
      onClick={handleClick}
      size={1}
      readOnly
    />
  );
});
