import {
  INITIAL_COL,
  INITIAL_ROW,
  Tetrominoes,
  TetrominoesKeys,
} from '../constants/pieceConstants';

class Piece {
  private tetrominoSequence: string[] = [];

  private getRandomPieceIndex = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private createTetrominoList = () => {
    while (TetrominoesKeys.length) {
      const TetrominoIndex = this.getRandomPieceIndex(
        0,
        TetrominoesKeys.length - 1
      );
      const piece = TetrominoesKeys.splice(TetrominoIndex, 1)[0];
      this.tetrominoSequence.push(piece);
    }
  };

  public getNextPiece = () => {
    console.log('tetrominoSequence', this.tetrominoSequence);
    // if (this.tetrominoSequence.length < 2) {
    //   this.createTetrominoList();
    // }
    const TetrominoIndex = this.getRandomPieceIndex(
      0,
      TetrominoesKeys.length - 1
    );
    const pieceName = TetrominoesKeys.splice(TetrominoIndex, 1)[0];
    const piece = pieceName ? Tetrominoes[pieceName] : Tetrominoes[0];
    const col = INITIAL_COL;
    // const row = pieceName === 'I' ? -1 : 0;
    const row = INITIAL_ROW;
    return { piece, col, row, pieceName };
  };

  public currentPiece = this.getNextPiece();

  public rotate = (piece: number[][]) => {
    const TetrominoRows = piece.length - 1;
    const rotatedTetromino = piece.map((row, i) =>
      row.map((val, j) => piece[TetrominoRows - j][i])
    );
    return rotatedTetromino;
  };

  public printPiece = () => {
    this.currentPiece.piece.forEach((row) => {
      console.log(...row);
    });
  };
}

export default Piece;
