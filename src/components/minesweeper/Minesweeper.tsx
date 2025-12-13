import { useState } from 'react';
import { MinesweeperGame, boardStates } from '../../utils/minesweeper/MinesweeperGame';
import type { MatrixSize, MatrixIndex } from '../../types/board-types';

const Minesweeper = ({ rows, cols } : MatrixSize) => {
    const [game, setGame] = useState<MinesweeperGame | null>(null);
    const [visibleBoard, setVisibleBoard] = useState<number[][]>(() => Array.from({ length: rows },
                                                () => Array(cols).fill(boardStates.NONE)));
    const [gameOver, setGameOver] = useState<boolean>(false);

    const peek = (row : number, col : number) : void => {
        let currentGame : MinesweeperGame | null = game;

        if(currentGame === null) {
            currentGame = new MinesweeperGame(rows, cols, { row, col });
            setGame(currentGame);
        }
        
        if(currentGame !== null && !gameOver) {
            let copy : number[][] = [...visibleBoard];
            let posQueue : MatrixIndex[] = [];

            posQueue.push({ row, col });
            
            while(posQueue.length > 0) {
                let elem : MatrixIndex | undefined = posQueue.shift();

                if(elem !== undefined && copy[elem.row][elem.col] === boardStates.NONE) {
                    // position has not been processed
                    let result : number = currentGame.peekPosition(elem.row, elem.col);

                    copy[elem.row][elem.col] = result;

                    if(result === 0) {
                        // all squares around are not mines
                        const startR : number = (elem.row === 0 ? elem.row : elem.row-1);
                        const startC : number = (elem.col === 0 ? elem.col : elem.col-1);
                        const endR : number = (elem.row === rows-1 ? elem.row : elem.row+1);
                        const endC : number = (elem.col === cols-1 ? elem.col : elem.col+1);

                        for(let r : number = startR; r <= endR; r++) {
                            for(let c : number = startC; c <= endC; c++) {
                                if(copy[r][c] === boardStates.NONE) {
                                    // not already processed
                                    posQueue.push({ row : r, col : c});
                                }
                            }
                        }


                    } else if(result === boardStates.MINE) {
                        // lost the game
                        setGameOver(true);
                    }
                }
            }

            setVisibleBoard(copy);
        }
    }

    const flag = (row : number, col : number) : void => {
        let newState = visibleBoard[row][col] === boardStates.NONE ? boardStates.FLAG : boardStates.NONE;

        setVisibleBoard((prev : number[][]) => {
            let copy : number[][] = [ ...prev ];
            copy[row][col] = newState;
            return copy;
        })
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
                                onContextMenu={(e) => {e.preventDefault(); flag(rowIndex, colIndex)}}
                                className='h-12 w-12 bg-gray-500 border-1 border-gray-800 text-2xl'>
                                {visibleBoard[rowIndex][colIndex] === boardStates.NONE ? "" : visibleBoard[rowIndex][colIndex]}
                            </button>
                        );
                    });
                })}
            </div>
        </main>
    );
};

export default Minesweeper;