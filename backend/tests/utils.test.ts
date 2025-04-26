import { Piece } from '../src/classes/Piece';
import {
  calculateDropInterval,
  generateZerosMatrix,
  getSpectrum,
  mergeField,
  TETROMINOS,
} from '../src/classes/utils';

describe('utils unit tests suites', () => {
  it('should return 466.666', () => {
    expect(calculateDropInterval(4)).toBeCloseTo(466.666);
  });

  it('should return 16.666', () => {
    expect(calculateDropInterval(30)).toBeCloseTo(16.666);
  });

  const matrix = generateZerosMatrix(5, 10);
  it('should be defined', () => {
    expect(matrix).toBeDefined();
  });

  const shape = [matrix.length, matrix[0].length];
  it('should have a [5, 10] shape', () => {
    expect(shape).toStrictEqual([5, 10]);
  });

  const copy = [...matrix];
  copy.shift();
  copy.push(Array(10).fill(1));

  const piece = new Piece(TETROMINOS['I']);
  piece.rotate();
  const expectedMatrix = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];
  it('should be rotateMatrix(TETROMINOS["I"]', () => {
    expect(piece.matrix).toStrictEqual(expectedMatrix);
  });

  piece.move(0, 1);
  it('should be {x:3, y:1}', () => {
    expect(piece.position).toStrictEqual({ x: 3, y: 1 });
  });

  const mergedField = mergeField(matrix, piece);
  const expectedMergedField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  ];
  it('should match expected field', () => {
    expect(mergedField).toStrictEqual(expectedMergedField);
  }),
    describe('Spectrum unit test', () => {
      const testMatrix = [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 4],
        [2, 0, 1, 4],
        [2, 3, 1, 4],
      ];
      const result = getSpectrum(testMatrix);
      it('should match [2, 1, 4, 3]', () => {
        expect(result).toStrictEqual([2, 1, 4, 3]);
      });
    });
});
