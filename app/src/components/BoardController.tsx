import React, { useContext } from 'react';
import { BoardContext } from '../context/board-context';

import './BoardController.css';

type BoardControllerProps = {};

export const BoardController = ({}: BoardControllerProps) => {
  const boardCtx = useContext(BoardContext);

  const handleSolveBoard = () => {
    boardCtx.solve();
  };

  return (
    <div>
      <button className="btn" onClick={handleSolveBoard}>
        Solve
      </button>
    </div>
  );
};
