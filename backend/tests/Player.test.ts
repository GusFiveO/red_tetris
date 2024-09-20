import { Player } from '../src/classes/Player';
import { getFirstLine } from '../src/classes/utils';

describe('Player unit test suites', () => {
  describe('Basic tests', () => {
    const player = new Player('1', 'test', ['I']);

    it('should be "test"', () => {
      expect(player.name).toBe('test');
    });

    player.generateNewPiece();

    player.rotatePiece();
    const expectedMatrix = [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ];
    it('should be rotateMatrix(TETROMINOS["I"]', () => {
      expect(player.currentPiece.matrix).toStrictEqual(expectedMatrix);
    });

    player.dropPiece();
    it('should be {x:3, y:1}', () => {
      expect(player.currentPiece.position).toStrictEqual({ x: 3, y: 1 });
    });

    player.movePiece('left');

    player.movePiece('right');
    it('should be {x:3, y:1}', () => {
      expect(player.currentPiece.position).toStrictEqual({ x: 3, y: 1 });
    });
  });
  describe('Advanced test', () => {
    const player = new Player('1', 'test', ['O']);

    player.addPendingPenality(3);
    player.addPendingPenality(1);
    player.applyPenalities();
    for (let i = 1; i <= 4; i += 1) {
      for (let lines = i; lines > 0; lines -= 1) {
        player.field.unshift(Array(10).fill(1));
      }
      player.clearCompletedLine();
    }
    player.hardDropPiece();

    it('should be 1640', () => {
      expect(player.score).toBe(1640);
    });

    it('should be 2', () => {
      expect(player.level).toBe(2);
    });

    it('should be 5', () => {
      expect(getFirstLine(player.field)).toBe(6);
    });

    player.stopGameLoop();
  });
});
