import React, { useContext, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { BoardContext } from '../context/board-context';
import { Box } from './Box';

import './Board.css';

export const Board = () => {
  const ref = useRef<HTMLDivElement>(null);
  const boardCtx = useContext(BoardContext);
  const size = boardCtx.size;

  useOnClickOutside(ref, () => {
    boardCtx.setActiveUnit(null);
  });

  return (
    <div ref={ref} className="board flex flex-col gap-2">
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
