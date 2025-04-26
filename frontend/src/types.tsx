export type Matrix = number[][];

export interface Player {
  id: string;
  name: string;
  spectrum: number[];
}

export interface Piece {
  matrix: Matrix;
  position: { x: number; y: number };
}
