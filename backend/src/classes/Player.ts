import { EventEmitter } from 'events';
import { Piece } from './Piece';
import {
  calculateDropInterval,
  generateZerosMatrix,
  getSpectrum,
  removeCompletedRows,
  TETROMINOS,
  unshiftMatrix,
} from './utils';

export class Player extends EventEmitter {
  id: string;
  name: string;
  score: number;
  level: number;
  field: number[][];
  gameOver: boolean;
  pieceDropInterval: number;
  currentPiece: Piece;
  gameInterval: NodeJS.Timeout | null;
  tetrominoSequence: string[];
  linesCleared: number;
  spectrum: number[];
  pendingPenality: number[];

  constructor(id: string, name: string, tetrominoSequence: string[]) {
    super();
    this.id = id;
    this.name = name;
    this.field = generateZerosMatrix(20, 10);
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.gameOver = false;
    this.pieceDropInterval = 1000;
    this.tetrominoSequence = tetrominoSequence;
    this.currentPiece = this.generateNewPiece();
    this.gameInterval = null;
    this.spectrum = [];
    this.pendingPenality = [];
  }

  // PLAYER STATE
  levelUp() {
    this.level += 1;

    this.updateDropInterval();
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

  updateLevel() {
    if (this.linesCleared >= this.level * 10) {
      this.levelUp();
    }
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

  getNextPiece() {
    return new Piece(TETROMINOS[this.tetrominoSequence[0]]);
  }

  reset(tetrominoSequence: string[]) {
    this.field = generateZerosMatrix(20, 10);
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.pieceDropInterval = 1000;
    this.tetrominoSequence = tetrominoSequence;
    this.currentPiece = this.generateNewPiece();
    this.spectrum = [];
    this.pendingPenality = [];
    this.stopGameLoop();
  }

  // GAME LOOP
  startGameLoop() {
    this.stopGameLoop();
    this.emit('updateGameState');
    this.emit('updateSpectrum');
    this.emit('updateNextPiece');

    const intervalTime = this.pieceDropInterval;

    this.gameInterval = setInterval(() => {
      this.dropPiece();
      if (this.gameOver) {
        this.emit('gameOver');
        this.stopGameLoop();
      }
    }, intervalTime);
  }

  stopGameLoop() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
  }

  updateDropInterval() {
    this.pieceDropInterval = calculateDropInterval(this.level);

    this.stopGameLoop();
    this.startGameLoop();
  }

  // GAMEPLAY
  generateNewPiece() {
    const tetromino = this.tetrominoSequence.shift();
    if (tetromino) {
      this.tetrominoSequence.push(tetromino);
      const newPiece = new Piece(TETROMINOS[tetromino]);
      this.emit('updateNextPiece');
      return newPiece;
    }
    return new Piece(TETROMINOS['I']);
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

  hardDropPiece() {
    if (this.gameOver) {
      return;
    }
    while (!this.collides()) {
      this.currentPiece.move(0, 1);
    }
    this.pieceLanding();

    this.emit('updateGameState');
  }

  dropPiece() {
    if (this.gameOver) {
      return;
    }
    this.currentPiece.move(0, 1);

    if (this.collides()) {
      this.pieceLanding();
    }

    this.emit('updateGameState');
  }

  pieceLanding() {
    this.currentPiece.move(0, -1);
    this.lockPiece();
    this.clearCompletedLine();
    this.applyPenalities();

    this.currentPiece = this.generateNewPiece();
    if (this.hasLost()) {
      this.gameOver = true;
    }

    const spectrum = getSpectrum(this.field);
    if (this.spectrum != spectrum) {
      this.spectrum = spectrum;
      this.emit('updateSpectrum');
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
    this.field = removeCompletedRows(this.field);

    const nbDeletedLines = nbRows - this.field.length;

    if (nbDeletedLines > 1) {
      this.emit('linesDeleted', { nbLines: nbDeletedLines });
    }

    unshiftMatrix(this.field, nbDeletedLines);

    this.updateScore(nbDeletedLines);
    this.linesCleared += nbDeletedLines;
    this.updateLevel();
  }

  applyPenalities() {
    while (this.pendingPenality.length !== 0) {
      const penality = this.pendingPenality.pop();
      if (penality) {
        this.addUndestructibleLine(penality);
        if (Math.max(...this.spectrum) + penality > this.field.length) {
          this.gameOver = true;
        }
      }
    }
  }

  addPendingPenality(nbLines: number) {
    this.pendingPenality.push(nbLines);
  }

  addUndestructibleLine(nbLines: number) {
    for (let i = 0; i < nbLines; i += 1) {
      this.field.shift();
      this.field.push(Array(10).fill(-1));
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
            this.field[fieldY]?.[fieldX] != 0 ||
            this.field[fieldY]?.[fieldX] < 0
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
