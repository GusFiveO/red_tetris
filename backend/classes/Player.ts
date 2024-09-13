export class Player {
  id: string;
  name: string;
  score: number;
  field: number[][];
  pieceDropInterval: number;
  activePiece: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.field = this.initializeField();
    this.score = 0;
    this.pieceDropInterval = 1000;
    this.activePiece = this.generateNewPiece();
  }

  initializeField() {
    return Array(20)
      .fill(0)
      .map(() => Array(10).fill(0));
  }

  generateNewPiece() {
    return 0;
  }

  startPieceDrop() {}
}
