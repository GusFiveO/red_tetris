import { CURRENT_PIECE } from '../constants/gameConstants';
import Piece, { PieceType } from './Piece';

class Game {
  TetriminoesSequence: PieceType[] = [];
  PiecesActions = new Piece();
  gameBoard: number[][] = Array.from({ length: 20 }, () => Array(10).fill(0));

  initalizeGame = () => {
    for (let i = 0; i < 4; i++) {
      this.TetriminoesSequence.push(this.PiecesActions.generateNewPiece());
      console.log('TetriminoesSequence', this.TetriminoesSequence[0].piece);
    }
  };

  startGame = () => {
    this.initalizeGame();
  };

  updateGame = () => {
    return this.gameBoard;
  };

  addPieceInSequence = () => {
    this.TetriminoesSequence.push(this.PiecesActions.generateNewPiece());
  };

  removeFirstPieceInSequence = () => {
    this.TetriminoesSequence.shift();
  };

  printPieceInGameBoard = () => {
    const currentPiece = this.TetriminoesSequence[CURRENT_PIECE];
    for (let row = 0; row < currentPiece.piece.length; row++) {
      for (let col = 0; col < currentPiece.piece[row].length; col++) {
        if (this.TetriminoesSequence[CURRENT_PIECE].piece[row][col] !== 0) {
          this.gameBoard[currentPiece.row + row][currentPiece.colomn + col] =
            currentPiece.piece[row][col];
        }
      }
    }
  };

  printPieceSequence = () => {
    this.TetriminoesSequence.forEach((piece, index) => {
      console.log(`Piece #${index}: `, piece.piece);
    });
  };

  placePieceInGameBoard = () => {
    console.log('Before: ');
    this.printPieceSequence();
    this.printPieceInGameBoard();
    this.removeFirstPieceInSequence();
    this.addPieceInSequence();
    console.log('After: ');
    this.printPieceSequence();
  };
}

export default Game;
