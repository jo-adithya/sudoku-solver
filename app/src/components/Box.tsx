import React, { useContext } from 'react';
import { BoardContext } from '../context/board-context';
import { Unit } from './Unit';
import { Pos } from '../models/Pos';

import './Box.css';

type BoxProps = {
  i: number;
  j: number;
};

export const Box = ({ i, j }: BoxProps) => {
  const boardCtx = useContext(BoardContext);

  const size = boardCtx.size;

  return (
    <div className="box flex flex-col gap-1">
      {[...Array(size)].map((_, iBox) => (
        <div key={iBox} className="flex gap-1">
          {[...Array(size)].map((_, jBox) => {
            const iPos = i * size + iBox;
            const jPos = j * size + jBox;
            const pos = new Pos(iPos, jPos);

            return (
              <Unit
                key={iPos * size + jPos}
                unit={pos}
                ref={(el: any) => boardCtx.refs.current[iPos][jPos] = el}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
