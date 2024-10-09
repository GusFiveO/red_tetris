import { Game } from '../src/classes/Game';
import { Player } from '../src/classes/Player';

describe('Game unit test suites', () => {
  const game = new Game('1', 'test');
  const player1 = new Player('1', 'testPlayer1', [...game.tetrominoSequence]);
  game.addPlayer(player1);
  it('should return something', () => {
    expect(game.generateTetrominoSequence()).toBeDefined();
  });

  const player2 = new Player('2', 'testPlayer2', [...game.tetrominoSequence]);
  game.addPlayer(player2);
  const player3 = new Player('3', 'testPlayer3', [...game.tetrominoSequence]);
  game.addPlayer(player3);
  game.start();

  game.removePlayer('2');

  game.handlePlayerMove('1', 'left');
  game.handlePlayerMove('1', 'right');
  game.handlePlayerMove('1', 'drop');
  game.handlePlayerMove('1', 'rotate');
  game.handlePlayerMove('1', 'hardDrop');

  player1.emit('linesDeleted', { nbLines: 2 });
  player1.gameOver = true;
  player1.emit('gameOver');

  it('should return true', () => {
    expect(game.hasPlayer(player1.id)).toBe(true);
  });

  it('should return [player1, player3]', () => {
    expect(game.getAllPlayers()).toStrictEqual([player1, player3]);
  });

  it('should return [player3]', () => {
    expect(game.getAllOponents(player1.id)).toStrictEqual([player3]);
  });

  it('should return false', () => {
    expect(game.isEmpty()).toBe(false);
  });
});
