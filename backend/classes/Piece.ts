import { Matrix } from './utils';

export class Piece {
  matrix: Matrix;
  position: { x: number; y: number };

  constructor(matrix: number[][]) {
    this.matrix = matrix;
    this.position = { x: 3, y: 0 };
  }

  move(offsetX: number, offsetY: number) {
    this.position.x += offsetX;
    this.position.y += offsetY;
  }
}
