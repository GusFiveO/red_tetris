class gameService2 {
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

  private gameBoard: number[][] = Array.from({ length: 20 }, () =>
    Array(10).fill(0)
  );

  private getRandomPiece = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private createTetrominoList = () => {
    while (this.tetrominoNameList.length) {
      const TetrominoIndex = this.getRandomPiece(
        0,
        this.tetrominoNameList.length - 1
      );
      const piece = this.tetrominoNameList.splice(TetrominoIndex, 1)[0];
      this.tetrominoSequence.push(piece);
    }
  };

  private getNextPiece = () => {
    if (this.tetrominoSequence.length === 0) {
      this.createTetrominoList();
    }
    if (this.tetrominoSequence.length) {
      const pieceName = this.tetrominoSequence.pop();
      const piece = pieceName ? this.tetrominoList[pieceName] : undefined;
    }
  };
}

export default gameService2;
