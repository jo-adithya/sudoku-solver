import React from 'react';
import { BoardProvider } from './context/board-context';
import { Board } from './components/Board';
import { BoardController } from './components/BoardController';

import './App.css';

function App() {
  return (
    <div className="flex w-screen h-screen justify-center items-center main">
      <BoardProvider>
        <Board />
        <BoardController />
      </BoardProvider>
    </div>
  );
}

export default App;
