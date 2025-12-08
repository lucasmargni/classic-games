import { useState, useEffect, SetStateAction } from "react";
import { SnakeGame, boardStates } from "../utils/SnakeGame";
import type { MatrixIndex } from "../types/snake-types"

const SnakeBoard = ({ row, col } : MatrixIndex) => {
    const [game, _] = useState(() => new SnakeGame(row, col));
    const [isGameOn, setIsGameOn] = useState(false);
    const [points, setPoints] = useState(0);
    const [pressedKey, setPressedKey] = useState('');

    useEffect(() => {
        let interval : number | undefined;

        if(isGameOn) {
            interval = setInterval(() =>{
                let snakeAlive : boolean = !game.move();

                if(snakeAlive) {
                    setPoints((prev) => prev+10);
                } else {
                    setIsGameOn(false);
                }
                
            }, 800);
        }

        return () => clearInterval(interval);
    }, [isGameOn, points]);

    useEffect(() => {
        const handleKeyDown = (event : KeyboardEvent) => {
            setPressedKey(event.key);

            //if(isGameOn) {
                switch (event.key) {
                    case 'ArrowUp':
                    case 'w':
                        game.changeDirection('UP');
                        console.log(event.key);
                        break;
                    case 'ArrowDown':
                    case 's':
                        game.changeDirection('DOWN');
                        break;
                    case 'ArrowRight':
                    case 'd':
                        game.changeDirection('RIGHT');
                        break;
                    case 'ArrowLeft':
                    case 'a':
                        game.changeDirection('LEFT');
                        break;
                    default:
                        break;
                }
            //}
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const createClasses = (row : number, col : number) : string => {
        let classes : string = '';
        const actualState = game.board[row][col];

        if(actualState !== boardStates.NONE) {
            classes += 'h-8 w-8 rounded-full'

            if(actualState === boardStates.APPLE) {
                classes += ' bg-red-500'
            } else if(actualState === boardStates.HEAD) {
                classes += ' bg-blue-300'
            } else if(actualState === boardStates.BODY) {
                classes += ' bg-blue-500'
            }
        }
        
        return classes;
    };

    return (
        <main>
            <h1>Snake!!!</h1>

            <div className={`bg-blue-200 rounded-2xl p-8 grid grid-cols-${row} gap-2`}>
                {Array.from({ length: row }).map((_, rowIndex) => {
                    return Array.from({ length: col }).map((_, colIndex) => {
                        return (
                            <div className={`h-12 w-12 bg-green-500 grid items-center justify-center`}>
                                <div className={createClasses(rowIndex, colIndex)}/>
                            </div>
                        );
                    });
                })}
            </div>

            <button onClick={() => setIsGameOn((prev) => !prev)}>{isGameOn ? 'Pause' : 'Start'}</button>
            <div>Points: {points}</div>
        </main>
    );
};

export default SnakeBoard;