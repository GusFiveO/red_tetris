import Game from "../models/Game";

describe("Game class", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(); // Initialiser une nouvelle instance avant chaque test
  });

  it("should return a sequence of 3 pieces", () => {
    game.initalizeGame();
    expect(game.TetriminoesSequence.length).toBe(3);
  });
});
