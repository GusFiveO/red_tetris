import Piece from '../services/pieceService';

describe('Piece class', () => {
  let piece: Piece;

  beforeEach(() => {
    piece = new Piece(); // Initialiser une nouvelle instance avant chaque test
  });

  it('getNextPiece should return a valid piece object', () => {
    const nextPiece = piece.getNextPiece();
    expect(nextPiece).toHaveProperty('piece');
    expect(nextPiece).toHaveProperty('col');
    expect(nextPiece).toHaveProperty('row');
    expect(nextPiece).toHaveProperty('pieceName');
  });

  it('rotate should return a rotated piece', () => {
    const originalPiece = [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ];

    const rotatedPiece = piece.rotate(originalPiece);
    expect(rotatedPiece).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ]); // Adjust this based on your rotation logic
  });

  // Add more tests as needed
});
