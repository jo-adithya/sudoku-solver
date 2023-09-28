import React, { useContext, useState } from "react";
import { clsx } from "clsx";
import { BoardContext } from "../context/board-context";

type BoardControllerProps = {};

export const BoardController = ({}: BoardControllerProps) => {
  const [speed, setSpeed] = useState(1);
  const boardCtx = useContext(BoardContext);

  const handleSolveBoard = () => {
    boardCtx.solve(speed);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <button className="px-4 py-2 rounded-lg mb-2 bg-white hover:bg-gray-300" onClick={handleSolveBoard}>
        Solve
      </button>
      <button
        className={clsx(
          speed === 1 ? "bg-black text-white" : "hover:bg-gray-200",
          "bg-white rounded-full h-10 w-10 backdrop-blur-lg "
        )}
        onClick={() => setSpeed(1)}
      >
        1x
      </button>
      <button
        className={clsx(
          speed === 2 ? "bg-black text-white" : "hover:bg-gray-200",
          "bg-white rounded-full h-10 w-10 backdrop-blur-lg "
        )}
        onClick={() => setSpeed(2)}
      >
        2x
      </button>
      <button
        className={clsx(
          speed === 3 ? "bg-black text-white" : "hover:bg-gray-200",
          "bg-white rounded-full h-10 w-10 backdrop-blur-lg "
        )}
        onClick={() => setSpeed(3)}
      >
        3x
      </button>
      <button
        className={clsx(
          speed === 4 ? "bg-black text-white" : "hover:bg-gray-200",
          "bg-white rounded-full h-10 w-10 backdrop-blur-lg "
        )}
        onClick={() => setSpeed(4)}
      >
        4x
      </button>
      <button
        className={clsx(
          speed === 5 ? "bg-black text-white" : "hover:bg-gray-200",
          "bg-white rounded-full h-10 w-10 backdrop-blur-lg "
        )}
        onClick={() => setSpeed(5)}
      >
        5x
      </button>
    </div>
  );
};
