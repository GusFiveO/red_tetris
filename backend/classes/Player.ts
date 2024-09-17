import { Piece } from './Piece';
import { TETROMINOS } from './utils';

export class Player {
  id: string;
  name: string;
  score: number;
  field: number[][];
  ready: boolean;
  pieceDropInterval: number;
  currentPiece: Piece;
  gameInterval: NodeJS.Timeout | null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.field = this.initializeField();
    this.score = 0;
    this.ready = false;
    this.pieceDropInterval = 1000;
    this.currentPiece = this.generateNewPiece();
    this.gameInterval = null;
  }

  initializeField() {
    return Array(20)
      .fill(0)
      .map(() => Array(10).fill(0));
  }

  isReady() {
    return this.ready;
  }

  startGameLoop() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }

    const intervalTime = 1000;

    this.gameInterval = setInterval(() => {
      this.update();
    }, intervalTime);
  }

  update() {
    // this.field = createRandomMatrix(20, 10);
    this.dropPiece();
  }

  generateNewPiece() {
    const pieceKeys = Object.keys(TETROMINOS);
    const randomPieceKey =
      pieceKeys[Math.floor(Math.random() * pieceKeys.length)];
    return new Piece(TETROMINOS[randomPieceKey]);
  }

  movePiece(direction: 'left' | 'right') {
    const offsetX = direction == 'right' ? 1 : -1;

    this.currentPiece.move(offsetX, 0);
    if (this.collides()) {
      this.currentPiece.move(-offsetX, 0);
    }
  }

  rotatePiece() {
    this.currentPiece.rotate();

    if (this.collides()) {
      this.currentPiece.rotate();
      this.currentPiece.rotate();
      this.currentPiece.rotate();
    }
  }

  dropPiece() {
    this.currentPiece.move(0, 1);

    if (this.collides()) {
      this.currentPiece.move(0, -1);
      this.lockPiece();
      this.clearCompletedLine();
      this.currentPiece = this.generateNewPiece();
    }
  }

  private lockPiece() {
    const { x: posX, y: posY } = this.currentPiece.position;

    for (let y = 0; y < this.currentPiece.matrix.length; y++) {
      for (let x = 0; x < this.currentPiece.matrix[y].length; x++) {
        if (this.currentPiece.matrix[y][x] !== 0) {
          this.field[posY + y][posX + x] = this.currentPiece.matrix[y][x];
        }
      }
    }
  }

  clearCompletedLine() {
    const nbRows = this.field.length;
    this.field = this.field.filter((row) => row.some((cell) => cell === 0));

    const nbDeletedRows = nbRows - this.field.length;

    for (let i = 0; i < nbDeletedRows; i += 1) {
      this.field.unshift(Array(10).fill(0));
    }
  }

  collides() {
    const { x: pieceX, y: pieceY } = this.currentPiece.position;

    for (let y = 0; y < this.currentPiece.matrix.length; y++) {
      for (let x = 0; x < this.currentPiece.matrix[y].length; x++) {
        if (this.currentPiece.matrix[y][x] !== 0) {
          const fieldX = pieceX + x;
          const fieldY = pieceY + y;

          if (
            fieldX < 0 ||
            fieldX > this.field[0].length ||
            fieldY > this.field.length ||
            this.field[fieldY]?.[fieldX] != 0
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getMergedField() {
    const mergedField = this.field.map((row) => [...row]);

    const { x: pieceX, y: pieceY } = this.currentPiece.position;

    for (let y = 0; y < this.currentPiece.matrix.length; y++) {
      for (let x = 0; x < this.currentPiece.matrix[y].length; x++) {
        if (this.currentPiece.matrix[y][x] !== 0) {
          const fieldX = pieceX + x;
          const fieldY = pieceY + y;

          if (
            fieldY >= 0 &&
            fieldY < this.field.length &&
            fieldX >= 0 &&
            fieldX < this.field[0].length
          ) {
            mergedField[fieldY][fieldX] = this.currentPiece.matrix[y][x];
          }
        }
      }
    }

    return mergedField;
  }
}
