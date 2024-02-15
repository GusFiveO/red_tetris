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
    const pieceName = this.tetrominoSequence.pop();
    const piece = pieceName
      ? this.tetrominoList[pieceName]
      : this.tetrominoList[0];
    const col = this.gameBoard[0].length / 2 - Math.ceil(piece[0].length / 2);

    const row = pieceName === 'I' ? -1 : -2;
    return { piece, col, row, pieceName };
  };

  private rotate = (piece: number[][]) => {
    const len = piece.length - 1;
    const roatedPiece = piece.map((row, i) =>
      row.map((val, j) => piece[len - j][i])
    );
    return roatedPiece;
  };

  private checkCollision = (piece: number[][], row: number, col: number) => {
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (
          piece[i][j] &&
          (col + j < 0 ||
            col + j >= this.gameBoard[0].length ||
            row + i >= this.gameBoard.length)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  private currentPiece = this.getNextPiece();

  private placePiece = () => {
    for (let i = 0; i < this.currentPiece.piece.length; i++) {
      for (let j = 0; j < this.currentPiece.piece[i].length; j++) {
        if (this.currentPiece.piece[i][j]) {
          if (this.currentPiece.row + i < 0) {
            // game over function
            return false;
          }
          this.gameBoard[this.currentPiece.row + i][this.currentPiece.col + j] =
            this.currentPiece.piece[i][j];
        }
      }
    }
    for (let i = 0; i < this.gameBoard.length - 1; i >= 0) {
      if (this.gameBoard[i].every((val) => !!val)) {
        for (let r = i; r > 0; r--) {
          for (let c = 0; c < this.gameBoard[r].length; c++) {
            this.gameBoard[r][c] = this.gameBoard[r - 1][c];
          }
        }
      } else {
        i--;
      }
    }
    this.currentPiece = this.getNextPiece();
    return true;
  };

  public gameLoop = () => {
    this.placePiece();
    if (this.currentPiece) {
      if (
        !this.checkCollision(
          this.currentPiece.piece,
          this.currentPiece.row,
          this.currentPiece.col
        )
      ) {
        this.currentPiece.row--;
        this.placePiece();
      }
    }
  };

  public moveDown = () => {
    const nextRow = this.currentPiece.row + 1;
    if (
      !this.checkCollision(
        this.currentPiece.piece,
        nextRow,
        this.currentPiece.col
      )
    ) {
      this.currentPiece.row = nextRow - 1;
      this.placePiece();
    } else {
      this.currentPiece.row = nextRow;
    }
  };

  public moveLeft = () => {
    const nextCol = this.currentPiece.col - 1;
    if (
      this.checkCollision(
        this.currentPiece.piece,
        this.currentPiece.row,
        nextCol
      )
    ) {
      this.currentPiece.col = nextCol;
    }
  };

  public moveRight = () => {
    const nextCol = this.currentPiece.col + 1;
    if (
      this.checkCollision(
        this.currentPiece.piece,
        this.currentPiece.row,
        nextCol
      )
    ) {
      this.currentPiece.col = nextCol;
    }
  };

  public updateGame = () => {
    this.gameLoop();
    return this.gameBoard;
  };

  public gameStatus = () => {
    return this.gameBoard;
  };
}

export default gameService2;
