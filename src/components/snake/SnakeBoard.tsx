import { useState, useEffect, useRef } from 'react';
import { SnakeGame, boardStates } from '../../utils/snake/SnakeGame';
import type { MatrixSize } from '../../types/snake-types';

const SnakeBoard = ({ rows, cols } : MatrixSize) => {
    const [game, setGame] = useState(() => new SnakeGame(rows, cols));
    const [isGameOn, setIsGameOn] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [points, setPoints] = useState(0);
    const [pressedKey, setPressedKey] = useState('');

    const directionChanged = useRef(false);

    useEffect(() => {
        let interval : number | undefined;

        if(isGameOn) {
            interval = setInterval(() => {
                let snakeAlive : boolean = !game.move();

                directionChanged.current = false;

                if(snakeAlive) {
                    setPoints((prev) => prev+10);
                } else {
                    setIsGameOn(false);
                    setIsGameOver(true);
                }
                
            }, 300);
        }

        return () => clearInterval(interval);
    }, [isGameOn, points, game]);

    useEffect(() => {
        const handleKeyDown = (event : KeyboardEvent) => {
            setPressedKey(event.key);

            if(isGameOn && !directionChanged.current) {
                let dir : string = '';

                switch (event.key) {
                    case 'ArrowUp':
                    case 'w':
                        dir = 'UP';
                        break;
                    case 'ArrowDown':
                    case 's':
                        dir = 'DOWN';
                        break;
                    case 'ArrowRight':
                    case 'd':
                        dir = 'RIGHT';
                        break;
                    case 'ArrowLeft':
                    case 'a':
                        dir ='LEFT';
                        break;
                    default:
                        break;
                }

                directionChanged.current = game.changeDirection(dir);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [game, isGameOn]);

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

    const buttonAction = () => {
        if(isGameOver) {
            // restart the game
            setGame(() => new SnakeGame(rows, cols));
            setPoints(0);
            setIsGameOver(false);
        } else if(isGameOn) {
            // pause the game
            setIsGameOn(false);
        } else {
            // resume the game
            setIsGameOn(true);
        }
    };

    return (
        <main>
            <h1>Snake!!!</h1>

            <div className={ `bg-blue-200 rounded-2xl p-8 grid gap-2` } 
                style={{ gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))` }}>
                {Array.from({ length: rows }).map((_, rowIndex) => {
                    return Array.from({ length: cols }).map((_, colIndex) => {
                        return (
                            <div className={ `h-12 w-12 bg-green-500 grid items-center justify-center` }>
                                <div className={createClasses(rowIndex, colIndex)}/>
                            </div>
                        );
                    });
                })}
            </div>

            <button onClick={buttonAction}>{isGameOn ? 'Pause' : 'Start'}</button>
            <div>Points: {points}</div>
        </main>
    );
};

export default SnakeBoard;