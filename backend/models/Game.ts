import Piece, { PieceType } from "./Piece";

class Game {
  TetriminoesSequence: PieceType[] = [];
  PiecesActions = new Piece();

  initalizeGame = () => {
    for (let i = 0; i < 3; i++) {
      this.TetriminoesSequence.push(this.PiecesActions.generateNewPiece());
      console.log("TetriminoesSequence", this.TetriminoesSequence[0].piece);
    }
  };

  startGame = () => {
    this.initalizeGame();
    console.log("TetriminoesSequence", this.TetriminoesSequence);
  };
}

export default Game;
