class Piece {
  private tetrominoNameList = ['O', 'T', 'S', 'Z', 'L', 'J', 'I'];
  private tetrominoSequence: string[] = [];
  private tetrominoList: { [key: string]: number[][] } = {
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

  private getRandomPieceIndex = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private createTetrominoList = () => {
    while (this.tetrominoNameList.length) {
      const TetrominoIndex = this.getRandomPieceIndex(
        0,
        this.tetrominoNameList.length - 1
      );
      const piece = this.tetrominoNameList.splice(TetrominoIndex, 1)[0];
      this.tetrominoSequence.push(piece);
    }
  };

  public getNextPiece = () => {
    if (this.tetrominoSequence.length === 0) {
      this.createTetrominoList();
    }
    const pieceName = this.tetrominoSequence.pop();
    const piece = pieceName
      ? this.tetrominoList[pieceName]
      : this.tetrominoList[0];
    const col = 4;
    // const row = pieceName === 'O' ? -2 : -3;
    const row = 0;
    return { piece, col, row, pieceName };
  };

  public currentPiece = this.getNextPiece();
  public pieceName = this.currentPiece.pieceName;
  public col = this.currentPiece.col;
  public row = this.currentPiece.row;
  public piece = this.currentPiece.piece;

  public rotate = (piece: number[][]) => {
    const len = piece.length - 1;
    const roatedPiece = piece.map((row, i) =>
      row.map((val, j) => piece[len - j][i])
    );
    return roatedPiece;
  };

  public printPiece = () => {
    this.currentPiece.piece.forEach((row) => {
      console.log(...row);
    });
  };
}

export default Piece;
