import Game from '../models/Game';

describe('Game class', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(); // Initialiser une nouvelle instance avant chaque test
  });

  it('should return a sequence of 4 pieces', () => {
    game.initalizeGame();
    expect(game.TetriminoesSequence.length).toBe(4);
  });

  it('should remove the first piece in the sequence', () => {
    game.initalizeGame();
    game.removeFirstPieceInSequence();
    expect(game.TetriminoesSequence.length).toBe(3);
  });

  it('should add a new piece in the sequence', () => {
    game.initalizeGame();
    game.addPieceInSequence();
    expect(game.TetriminoesSequence.length).toBe(5);
  });

  it('should print the sequence of pieces', () => {
    game.initalizeGame();
    game.placePieceInGameBoard();
  });
});
