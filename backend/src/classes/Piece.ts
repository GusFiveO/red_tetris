import { Matrix, rotateMatrix } from './utils';

export class Piece {
  matrix: Matrix;
  position: { x: number; y: number };

  constructor(matrix: number[][]) {
    this.matrix = matrix;
    if (this.matrix[0].some((cell) => cell === 2)) {
      this.position = { x: 4, y: 0 };
    } else {
      this.position = { x: 3, y: 0 };
    }
  }

  move(offsetX: number, offsetY: number) {
    this.position.x += offsetX;
    this.position.y += offsetY;
  }

  rotate() {
    this.matrix = rotateMatrix(this.matrix);
  }

  getState() {
    return {
      matrix: this.matrix,
      position: this.position,
    };
  }
}
