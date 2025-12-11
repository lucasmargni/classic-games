import { useState } from 'react';
import { MinesweeperGame } from '../../utils/minesweeper/MinesweeperGame';
import type { MatrixSize } from '../../types/board-types';

const Minesweeper = ({ rows, cols } : MatrixSize) => {
    const [game, setGame] = useState(() => new MinesweeperGame(rows, cols));
    const [visibleBoard, setVisibleBoard] = useState(() => Array.from({ length: rows }, () => Array(cols).fill(null)));
    const [gameOver, setGameOver] = useState(false);

    const peek = (row : number, col : number) : void => {
        let result : number = game.peekPosition(row, col);

        setVisibleBoard(prev => {
            const copy = prev.map(row => [...row]);
            copy[row][col] = result;
            return copy;
        });
    }

    return (
        <main className='flex flex-col items-center mt-20'>
            <h1>Minesweeper</h1>
            <div className='p-8 m-5 grid'
                style={{ gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))` }}>
                {Array.from({ length: rows }).map((_, rowIndex) => {
                    return Array.from({ length: cols }).map((_, colIndex) => {
                        return (
                            <button key={`${rowIndex}-${colIndex}`}
                                onClick={() => peek(rowIndex, colIndex)}
                                className='h-12 w-12 bg-gray-500 border-1 border-gray-800 text-2xl'>
                                {visibleBoard[rowIndex][colIndex] ?? ""}
                            </button>
                        );
                    });
                })}
            </div>
        </main>
    );
};

export default Minesweeper;