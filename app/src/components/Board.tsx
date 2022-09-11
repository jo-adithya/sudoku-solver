import React, { useContext } from 'react';
import { BoardContext } from '../context/board-context';
import { Box } from './Box';

import './Board.css';

export const Board = () => {
  const boardCtx = useContext(BoardContext);

  const size = boardCtx.size;

  return (
    <div className="board flex flex-col gap-2">
      {[...Array(size)].map((_, i) => (
        <div key={i} className="flex gap-2">
          {[...Array(size)].map((_, j) => (
            <Box key={i * size + j} i={i} j={j} />
          ))}
        </div>
      ))}
    </div>
  );
};
