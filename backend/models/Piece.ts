import {
  INITIAL_COL,
  INITIAL_ROW,
  Tetrominoes,
  TetrominoesKeys,
} from "../constants/pieceConstants";

export const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

export interface PieceType {
  piece: number[][];
  colomn: number;
  row: number;
}

class Piece {
  generateNewPiece = () => {
    const randomIndex = getRandomIndex(6);
    const pieceKey = TetrominoesKeys[randomIndex];
    const piece = Tetrominoes[pieceKey];
    const colomn = INITIAL_COL;
    const row = INITIAL_ROW;
    const newPiece: PieceType = { piece, colomn, row };
    return newPiece;
  };

  rotate = (piece: number[][]) => {
    const TetrominoRows = piece.length - 1;
    const rotatedTetromino = piece.map((row, i) =>
      row.map((val, j) => piece[TetrominoRows - j][i])
    );
    return rotatedTetromino;
  };
}

export default Piece;
