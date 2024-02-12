const Tetriminos = [
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 2, 0],
    [0, 2, 0],
    [0, 2, 0],
  ],
  [
    [0, 3, 3],
    [0, 3, 0],
    [0, 3, 0],
  ],
  [
    [0, 4, 0],
    [4, 4, 4],
    [0, 0, 0],
  ],
  [
    [5, 5],
    [5, 5],
  ],
  [
    [6, 6, 0],
    [0, 6, 0],
    [0, 6, 0],
  ],
  [
    [0, 0, 0],
    [0, 7, 7],
    [7, 7, 0],
  ],
];

class GameService {
  /*
   * Game board is a 20x10 grid
   */
  private gameBoard: number[][] = Array.from({ length: 20 }, () =>
    Array(10).fill(0)
  );

  /*
   * Actual playing Tetrimino
   */
  private actualTetrimino: number[][] = [];

  constructor() {
    this.startGame();
  }

  /*
   * Giving the new piece to the player
   */
  private createNewTetrimino = () => {
    const TetriminoIndex = Math.floor(Math.random() * Tetriminos.length);
    this.actualTetrimino = Tetriminos[TetriminoIndex];
  };

  /*
   *
   */
  public moveDown = () => {
    if (this.canFall()) {
      this.eraseTetrimino();
      this.actualTetrimino.forEach((row) => row[0]++);
    } else {
      this.createNewTetrimino();
      this.updateGame();
    }
  };

  public moveLeft = () => {
    if (this.canMove(-1)) {
      this.eraseTetrimino();
      this.actualTetrimino.forEach((row) => row[1]--);
      this.updateGame();
    }
  };

  public moveRight = () => {
    if (this.canMove(1)) {
      this.eraseTetrimino();
      this.actualTetrimino.forEach((row) => row[1]++);
      this.updateGame();
    }
  };

  private canFall = () => {
    for (const [row, col] of this.actualTetrimino) {
      if (
        row + 1 >= this.gameBoard.length ||
        this.gameBoard[row + 1][col] !== 0
      ) {
        return false;
      }
    }
    return true;
  };

  private canMove = (direction: number) => {
    for (const [row, col] of this.actualTetrimino) {
      if (
        col + direction < 0 ||
        col + direction >= this.gameBoard[0].length ||
        this.gameBoard[row][col + direction] !== 0
      ) {
        return false;
      }
    }
    return true;
  };

  private eraseTetrimino = () => {
    this.actualTetrimino.forEach(([row, col]) => {
      this.gameBoard[row][col] = 0;
    });
  };

  public updateGame = () => {
    if (this.canFall()) {
      this.eraseTetrimino();
      this.actualTetrimino.forEach(([row, col]) => {
        this.gameBoard[row][col] = 1;
      });
      this.eraseRow();
    }
  };

  public gameStatus = () => {
    return this.gameBoard;
  };

  public actualTetriminoStatus = () => {
    return this.actualTetrimino;
  };

  // Fonction pour effacer les lignes complètes
  private eraseRow = () => {
    for (let row = this.gameBoard.length - 1; row >= 0; row--) {
      if (this.gameBoard[row].every((cell) => cell !== 0)) {
        this.gameBoard.splice(row, 1);
        this.gameBoard.unshift(Array(10).fill(0));
      }
    }
  };

  public startGame = () => {
    this.createNewTetrimino();
  };
}

export default GameService;
