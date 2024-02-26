export const Tetrominoes: { [key: string]: number[][] } = {
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 2, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  S: [
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0],
  ],
  Z: [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 5],
    [5, 5, 5],
    [0, 0, 0],
  ],
  J: [
    [6, 0, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  I: [
    [0, 0, 7, 0],
    [0, 0, 7, 0],
    [0, 0, 7, 0],
    [0, 0, 7, 0],
  ],
};

export const TetrominoesKeys = ['O', 'T', 'S', 'Z', 'L', 'J', 'I'];

export const INITIAL_COL = 4;
export const INITIAL_ROW = 0;
