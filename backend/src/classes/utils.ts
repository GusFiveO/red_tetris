import { Piece } from './Piece';

export type Matrix = number[][];

export const TETROMINOS: { [key: string]: Matrix } = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [2, 2],
    [2, 2],
  ],
  T: [
    [3, 3, 3],
    [0, 3, 0],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 4],
    [4, 4, 4],
    [0, 0, 0],
  ],
  J: [
    [5, 0, 0],
    [5, 5, 5],
    [0, 0, 0],
  ],
  S: [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0],
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
};

export const FRAMES_PER_DROP = [
  48, 43, 38, 33, 28, 23, 18, 13, 8, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 1,
];

export const TARGET_SECONDS_PER_FRAME = 1000 / 60;

export function calculateDropInterval(level: number) {
  if (level > 29) {
    level = 29;
  }
  return FRAMES_PER_DROP[level] * TARGET_SECONDS_PER_FRAME;
}

export function generateZerosMatrix(rows: number, columns: number) {
  return Array(rows)
    .fill(0)
    .map(() => Array(columns).fill(0));
}

export function unshiftMatrix(matrix: Matrix, nbLines: number) {
  for (let i = 0; i < nbLines; i += 1) {
    matrix.unshift(Array(10).fill(0));
  }
}

export function removeCompletedRows(matrix: Matrix) {
  return matrix.filter((row) => row.some((cell) => cell === 0 || cell === -1));
}

export function getFirstLine(matrix: Matrix) {
  const firstLine = matrix.findIndex((row) => row.some((cell) => cell !== 0));
  if (firstLine < 0) {
    return 0;
  }
  return matrix.length - firstLine;
}

export function rotateMatrix(matrix: Matrix): Matrix {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
}

export function mergeField(field: Matrix, piece: Piece) {
  const mergedField = field.map((row) => [...row]);

  const { x: pieceX, y: pieceY } = piece.position;

  for (let y = 0; y < piece.matrix.length; y++) {
    for (let x = 0; x < piece.matrix[y].length; x++) {
      if (piece.matrix[y][x] !== 0) {
        const fieldX = pieceX + x;
        const fieldY = pieceY + y;

        if (
          fieldY >= 0 &&
          fieldY < field.length &&
          fieldX >= 0 &&
          fieldX < field[0].length
        ) {
          mergedField[fieldY][fieldX] = piece.matrix[y][x];
        }
      }
    }
  }

  return mergedField;
}
