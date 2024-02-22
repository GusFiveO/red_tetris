import { stdout } from 'process';
import Piece from './pieceService';

class gameService {
  public piece = new Piece();
  private gameBoard: number[][] = Array.from({ length: 20 }, () =>
    Array(10).fill(0)
  );

  public printBoard = () => {
    console.log('-------------------');
    this.gameBoard.forEach((row) => {
      row.forEach((val) => {
        if (val) {
          stdout.write('\x1b[1;5;31m ' + val + '\x1b[0m');
        } else {
          stdout.write('\x1b[1;33m ' + val + '\x1b[0m');
        }
      });
      console.log();
    });
    console.log('-------------------');
  };

  public printPiece = () => {
    for (let i = 0; i < this.piece.piece.length; i++) {
      for (let j = 0; j < this.piece.piece[i].length; j++) {
        if (this.piece.piece[i][j] !== 0) {
          this.gameBoard[this.piece.row + i][this.piece.col + j] =
            this.piece.piece[i][j];
        }
      }
    }
  };

  public checkCollision = (row: number, col: number) => {
    for (let i = 0; i < this.piece.piece.length; i++) {
      for (let j = 0; j < this.piece.piece[i].length; j++) {
        if (
          this.piece.piece[i][j] !== 0 &&
          (col + j < 0 ||
            col + j >= this.gameBoard[0].length ||
            row + i >= this.gameBoard.length ||
            this.gameBoard[row + i][col + j] !== 0)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  public eraseOldPosition = () => {
    for (let i = 0; i < this.piece.piece.length - 1; i++) {
      for (let j = 0; j < this.piece.piece[i].length; j++) {
        if (this.piece.piece[i][j] !== 0) {
          this.gameBoard[this.piece.row + i][this.piece.col + j] = 0;
        }
      }
    }
  };

  public moveDown = () => {
    if (this.checkCollision(this.piece.row + 1, this.piece.col)) {
      this.eraseOldPosition();
      this.piece.row++;
    } else {
      this.piece.currentPiece = this.piece.getNextPiece();
      this.piece.row = this.piece.currentPiece.row;
      this.piece.col = this.piece.currentPiece.col;
      this.piece.piece = this.piece.currentPiece.piece;
    }
  };

  public moveLeft = () => {
    if (this.checkCollision(this.piece.row, this.piece.col - 1)) {
      this.eraseOldPosition();
      this.piece.col--;
    }
  };

  public moveRight = () => {
    if (this.checkCollision(this.piece.row, this.piece.col + 1)) {
      this.eraseOldPosition();
      this.piece.col++;
    }
  };
}

export default gameService;
