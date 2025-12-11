import type { MatrixIndex } from '../../types/board-types';
import type { enumBoard } from '../../types/snake-types';

export const boardStates : enumBoard = {
    NONE : 0,
    BODY : 1,
    HEAD : 2,
    APPLE : 3
};

export class SnakeGame {
    rows : number;
    cols : number;
    board : number[][]; // 0: nothing - 1: snake - 2: head - 3: apple
    snake : MatrixIndex[]; // acting like a queue, tail at 0 - head at length
    apple : MatrixIndex;
    length : number;
    direction : string; // 'RIGHT' - 'LEFT' - 'UP' - 'DOWN'
    gameOver : boolean;

    constructor(rows : number, cols : number) {
        this.rows = rows;
        this.cols = cols;
        this.board = new Array(this.rows)
            .fill(null)
            .map(() => new Array(this.cols).fill(0));

        const headRow = Math.floor(this.rows / 2);
        const headCol = Math.floor(this.cols / 2);
        
        this.snake = [{ row : headRow, col : headCol-2}, { row : headRow, col : headCol-1}, { row : headRow, col : headCol}];

        console.table(this.board);

        this.board[this.snake[0].row][this.snake[0].col] = boardStates.BODY;
        this.board[this.snake[1].row][this.snake[1].col] = boardStates.BODY;
        this.board[this.snake[2].row][this.snake[2].col] = boardStates.HEAD;

        this.apple = this.randomApple();
        this.board[this.apple.row][this.apple.col] = boardStates.APPLE;

        this.length = 3;
        this.direction = 'RIGHT';
        this.gameOver = false;
    }

    private randomApple() : MatrixIndex {
        let overlap : boolean = true;
        let appleRow : number = 0;
        let appleCol : number = 0;

        while(overlap) {
            appleRow = Math.floor(Math.random() * this.rows);
            appleCol = Math.floor(Math.random() * this.cols);

            overlap = this.board[appleRow][appleCol] !== boardStates.NONE;
        }

        return { row : appleRow, col : appleCol };
    }

    changeDirection(dir : string) : boolean {
        let changed : boolean = false;

        // The snake only can go to an perpendicular direction
        if(this.direction === 'UP' || this.direction === 'DOWN') {
            if(dir === 'RIGHT' || dir === 'LEFT') {
                this.direction = dir;
                changed = true;
            }
        } else { // this.direction === 'RIGHT' || this.direction === 'LEFT'
            if(dir === 'UP' || dir === 'DOWN') {
                this.direction = dir;
                changed = true;
            }
        }

        return changed;
    }

    move() : boolean {
        let snakeDead = false;
        let newHead : MatrixIndex = { ...this.snake[this.length-1] };
        
        switch (this.direction) {
            case 'UP':
                newHead.row--;
                break;
            case 'DOWN':
                newHead.row++;
                break;
            case 'RIGHT':
                newHead.col++;
                break;
            case 'LEFT':
                newHead.col--;
                break;
            default:
                break;
        }

        if(newHead.row < 0 || newHead.row >= this.rows || newHead.col < 0 || newHead.col >= this.cols) {
            // snake out of limits
            this.gameOver = true;
            snakeDead = true;
        } else if(this.board[newHead.row][newHead.col] === boardStates.BODY) {
            // snake eat itself
            this.gameOver = true;
            snakeDead = true;
        } else {
            // snake moves
            let prevHead = this.snake[this.length-1];
            this.snake.push(newHead);

            if(this.board[newHead.row][newHead.col] === boardStates.APPLE) {
                // snake eats the apple and grows
                this.length++;
                this.apple = this.randomApple();
                this.board[this.apple.row][this.apple.col] = boardStates.APPLE;
            } else {
                let tail : MatrixIndex | undefined = this.snake.shift();
                if(tail !== undefined) {
                    this.board[tail.row][tail.col] = boardStates.NONE;
                }
            }

            // update head in board
            this.board[newHead.row][newHead.col] = boardStates.HEAD;
            this.board[prevHead.row][prevHead.col] = boardStates.BODY;
        }

        return snakeDead;
    }

    printBoard() : void {
        console.table(this.board);
    }
}
/*
const a = new SnakeGame(4, 4);
a.printBoard();
a.move();
a.printBoard();
a.changeDirection('UP');
a.move();
a.printBoard();
a.move();
a.printBoard();
a.changeDirection('LEFT');
a.move();
a.printBoard();*/