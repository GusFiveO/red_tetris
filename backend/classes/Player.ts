import { EventEmitter } from 'events';
import { Piece } from './Piece';
import { FRAMES_PER_DROP, TARGET_SECONDS_PER_FRAME, TETROMINOS } from './utils';

export class Player extends EventEmitter {
  id: string;
  name: string;
  score: number;
  level: number;
  field: number[][];
  ready: boolean;
  gameOver: boolean;
  pieceDropInterval: number;
  currentPiece: Piece;
  gameInterval: NodeJS.Timeout | null;
  tetrominoSequence: string[];
  linesCleared: number;

  constructor(id: string, name: string, tetrominoSequence: string[]) {
    super();
    this.id = id;
    this.name = name;
    this.field = this.initializeField();
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.ready = false;
    this.gameOver = false;
    this.pieceDropInterval = 1000;
    this.tetrominoSequence = tetrominoSequence;
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

    const intervalTime = this.pieceDropInterval;

    this.gameInterval = setInterval(() => {
      this.update();

      this.emit('updateGameState');
    }, intervalTime);
  }

  update() {
    this.dropPiece();
  }

  generateNewPiece() {
    const tetromino = this.tetrominoSequence.shift(); // Get and remove the first item
    if (tetromino) {
      this.tetrominoSequence.push(tetromino); // Optionally put it back for future use
      const newPiece = new Piece(TETROMINOS[tetromino]);
      return newPiece;
    }
    return new Piece(TETROMINOS['I']); // Default to 'I' if no tetromino available
  }

  movePiece(direction: 'left' | 'right') {
    const offsetX = direction == 'right' ? 1 : -1;

    this.currentPiece.move(offsetX, 0);
    if (this.collides()) {
      this.currentPiece.move(-offsetX, 0);
    }

    this.emit('updateGameState');
  }

  rotatePiece() {
    this.currentPiece.rotate();

    if (this.collides()) {
      this.currentPiece.rotate();
      this.currentPiece.rotate();
      this.currentPiece.rotate();
    }

    this.emit('updateGameState');
  }

  dropPiece() {
    if (this.gameOver) {
      return;
    }
    this.currentPiece.move(0, 1);

    if (this.collides()) {
      this.currentPiece.move(0, -1);
      this.lockPiece();
      this.clearCompletedLine();
      this.currentPiece = this.generateNewPiece();
      if (this.hasLost()) {
        this.gameOver = true;
        this.emit('gameOver');
      }
    }

    this.emit('updateGameState');
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

    const nbDeletedLines = nbRows - this.field.length;

    for (let i = 0; i < nbDeletedLines; i += 1) {
      this.field.unshift(Array(10).fill(0));
    }
    this.updateScore(nbDeletedLines);
    this.linesCleared += nbDeletedLines;

    if (this.linesCleared >= this.level * 10) {
      this.levelUp();
    }
  }

  updateScore(nbDeletedLines: number) {
    switch (nbDeletedLines) {
      case 1:
        this.score += 40 * this.level;
        break;
      case 2:
        this.score += 100 * this.level;
        break;
      case 3:
        this.score += 300 * this.level;
        break;
      case 4:
        this.score += 1200 * this.level;
        break;
    }
    this.emit('updateScore');
  }

  calculateDropInterval(level: number) {
    if (level > 29) {
      level = 29;
    }
    return FRAMES_PER_DROP[level] * TARGET_SECONDS_PER_FRAME;
  }

  levelUp() {
    this.level += 1;

    this.pieceDropInterval = this.calculateDropInterval(this.level);
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }

    this.startGameLoop();
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

  hasLost() {
    const { x: pieceX, y: pieceY } = this.currentPiece.position;

    for (let y = 0; y < this.currentPiece.matrix.length; y++) {
      for (let x = 0; x < this.currentPiece.matrix[y].length; x++) {
        if (this.currentPiece.matrix[y][x] !== 0) {
          const fieldX = pieceX + x;
          const fieldY = pieceY + y;

          if (fieldY >= 0 && this.field[fieldY][fieldX] !== 0) {
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
