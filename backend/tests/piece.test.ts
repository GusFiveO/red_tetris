import Piece, { getRandomIndex } from "../models/Piece";

describe("Piece class", () => {
  let piece: Piece;

  beforeEach(() => {
    piece = new Piece(); // Initialiser une nouvelle instance avant chaque test
  });

  it("should return a random number between 0 and 6", () => {
    const randomIndex = getRandomIndex(6);
    expect(randomIndex).toBeGreaterThanOrEqual(0);
    expect(randomIndex).toBeLessThanOrEqual(6);
  });

  it("should return a new piece", () => {
    const newPiece = piece.generateNewPiece();
    expect(newPiece).toEqual({
      piece: expect.any(Array),
      colomn: 4,
      row: 0,
    });
  });

  it("rotate should return a rotated piece", () => {
    const originalI = [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ];

    const rotatedI = piece.rotate(originalI);
    expect(rotatedI).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ]);
  });

  // Add more tests as needed
});
