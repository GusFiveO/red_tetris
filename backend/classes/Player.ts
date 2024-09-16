import { createRandomMatrix } from './utils';

export class Player {
  id: string;
  name: string;
  score: number;
  field: number[][];
  pieceDropInterval: number;
  activePiece: number;
  gameInterval: NodeJS.Timeout | null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.field = this.initializeField();
    this.score = 0;
    this.pieceDropInterval = 1000;
    this.activePiece = this.generateNewPiece();
    this.gameInterval = null;
  }

  initializeField() {
    return Array(20)
      .fill(0)
      .map(() => Array(10).fill(0));
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
    this.field = createRandomMatrix(20, 10);
  }

  generateNewPiece() {
    return 0;
  }

  startPieceDrop() {}
}
