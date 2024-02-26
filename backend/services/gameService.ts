import { stdout } from 'process';
import Piece from './pieceService';

class gameService {
  public squares = ['🟨', '🟧', '🟥', '🟪', '🟦', '🟩', '🟫'];
  public piece = new Piece();
  private gameBoard: number[][] = Array.from({ length: 20 }, () =>
    Array(10).fill(0)
  );

  public printBoard = () => {
    console.log('-------------------');
    this.gameBoard.forEach((row) => {
      row.forEach((val) => {
        if (val) {
          stdout.write(this.squares[val - 1]);
        } else {
          stdout.write('\x1b[1;38m' + ' ▪' + '\x1b[0m');
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
            this.gameBoard[row + i][col + j])
        ) {
          return false;
        }
      }
    }
    return true;
  };

  public eraseOldPosition = () => {
    console.log('la piece est : ', this.piece.piece);
    for (let i = 0; i < this.piece.piece.length - 1; i++) {
      for (let j = 0; j < this.piece.piece[i].length; j++) {
        if (this.piece.piece[i][j] !== 0) {
          this.gameBoard[this.piece.row + i][this.piece.col + j] = 0;
        }
      }
    }
  };

  public placePiece = () => {
    for (let i = 0; i < this.piece.piece.length; i++) {
      for (let j = 0; j < this.piece.piece[i].length; j++) {
        if (this.piece.piece[i][j] !== 0) {
          this.gameBoard[this.piece.row + i][this.piece.col + j] =
            this.piece.piece[i][j];
        }
      }
    }
  };

  public moveDown = () => {
    this.eraseOldPosition();
    if (this.checkCollision(this.piece.row + 1, this.piece.col)) {
      this.piece.row++;
    } else {
      this.placePiece();
      this.piece.changePiece();
    }
    this.printPiece();
  };

  public moveLeft = () => {
    if (this.checkCollision(this.piece.row, this.piece.col - 1)) {
      this.piece.col--;
      this.eraseOldPosition();
    }
  };

  public moveRight = () => {
    if (this.checkCollision(this.piece.row, this.piece.col + 1)) {
      this.eraseOldPosition();
      this.piece.col++;
      this.printPiece();
    }
  };

  public startGame = () => {
    this.piece.changePiece();
  };
}

export default gameService;
