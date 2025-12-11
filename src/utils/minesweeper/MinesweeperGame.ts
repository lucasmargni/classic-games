import type { MatrixIndex } from '../../types/board-types'
import type { enumBoard } from '../../types/minesweeper-types';

const minePercentage : number = 0.2;

export const boardStates : enumBoard = {
    NONE : -2,
    MINE : -1
};

export class MinesweeperGame {
    rows : number;
    cols : number;
    board : number[][];
    mines : MatrixIndex[];
    totalMines : number;
    gameOver : boolean;

    constructor(rows : number, cols : number) {
        this.rows = rows;
        this.cols = cols;
        this.board = new Array(this.rows)
            .fill(null)
            .map(() => new Array(this.cols).fill(boardStates.NONE));

        this.totalMines = Math.floor(this.rows * this.cols * minePercentage);

        this.mines = [];
        this.getRandomPositions();

        this.gameOver = false;
    }

    private getRandomPositions() : void {
        // updates this.mines and this.board at the same time
        let count : number = 0;
        let matrixPos : MatrixIndex;

        this.mines = [];

        while(count < this.totalMines) {
            matrixPos = { row : Math.floor(Math.random()*this.rows),  col : Math.floor(Math.random()*this.cols)};

            if(!this.mines.some(pos => pos.row === matrixPos.row && pos.col === matrixPos.col)) {
                // matrixPos is a new position
                this.mines.push(matrixPos);
                this.board[matrixPos.row][matrixPos.col] = boardStates.MINE;
                count++;
            }

            console.log(matrixPos);
        }
    }

    peekPosition(row : number, col : number) : number {
        let result : number = 0;

        if(row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            // position on the board

            if(this.board[row][col] === boardStates.MINE) {
                result = boardStates.MINE;
                this.gameOver = true;
            } else if(this.board[row][col] === boardStates.NONE) {
                result = this.countMinesAround(row, col);

                this.board[row][col] = result;
            }
            // if neither options, it was already peeked
        }

        return result;
    }

    private countMinesAround(row : number, col : number) : number {
        let count : number = 0;
        const startR : number = (row === 0 ? 1 : 0);
        const startC : number = (col === 0 ? 1 : 0);
        const endR : number = (row === this.rows-1 ? 2 : 3);
        const endC : number = (col === this.cols-1 ? 2 : 3);

        for(let r : number = startR; r < endR; r++) {
            for(let c : number = startC; c < endC; c++) {
                if(r !== 1 || c !== 1) {
                    // not in current position
                    count += (this.board[row-1+r][col-1+c] === boardStates.MINE ? 1 : 0);
                }
            }
        }

        return count;
    }

    private resetBoard() : void {
        this.board = new Array(this.rows)
            .fill(null)
            .map(() => new Array(this.cols).fill(boardStates.NONE));
    }

    printBoard() : void {
        console.table(this.board);
    }
}

const a = new MinesweeperGame(2, 5);
a.printBoard();
console.log(a.peekPosition(0, 0));
console.log(a.peekPosition(0, 1));
a.printBoard();