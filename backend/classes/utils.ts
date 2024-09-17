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
    [0, 0, 0],
    [3, 3, 3],
    [0, 3, 0],
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

export function createRandomMatrix(
  numRows: number,
  numCols: number
): number[][] {
  const matrix: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    const row: number[] = [];
    for (let j = 0; j < numCols; j++) {
      const randomNumber = Math.floor(Math.random() * 10);
      row.push(randomNumber);
    }
    matrix.push(row);
  }

  return matrix;
}
