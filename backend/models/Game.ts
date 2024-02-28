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

  addPieceInSequence = (sequence: PieceType[], action: Piece) => {
    sequence.push(action.generateNewPiece());
  };

  removeFirstPieceInSequence = (sequence: PieceType[]) => {
    sequence.shift();
  };

  eraseCurrentPieceOldPosition = (
    currentPiece: PieceType,
    sequence: PieceType[]
  ) => {
    for (let row = 0; row < currentPiece.piece.length; row++) {
      for (let col = 0; col < currentPiece.piece[row].length; col++) {
        if (sequence[CURRENT_PIECE].piece[row][col] !== 0) {
          this.gameBoard[currentPiece.row + row][currentPiece.colomn + col] = 0;
        }
      }
    }
  };

  printPieceInGameBoard = (currentPiece: PieceType, sequence: PieceType[]) => {
    for (let row = 0; row < currentPiece.piece.length; row++) {
      for (let col = 0; col < currentPiece.piece[row].length; col++) {
        if (sequence[CURRENT_PIECE].piece[row][col] !== 0) {
          this.gameBoard[currentPiece.row + row][currentPiece.colomn + col] =
            currentPiece.piece[row][col];
        }
      }
    }
  };

  printPieceSequence = (sequence: PieceType[]) => {
    sequence.forEach((currentPiece, index) => {
      console.log(`Piece #${index}: `, currentPiece.piece);
    });
  };

  placePieceInGameBoard = () => {
    this.removeFirstPieceInSequence(this.TetriminoesSequence);
    this.addPieceInSequence(this.TetriminoesSequence, this.PiecesActions);
  };
}

export default Game;
