import { Game } from '../src/classes/Game';

describe('Game unit test suites', () => {
  const game = new Game('test');
  it('should return something', () => {
    expect(game.generateTetrominoSequence()).toBeDefined();
  });

  const player1 = game.addPlayer('1', 'testPlayer1');
  game.addPlayer('2', 'testPlayer2');
  const player3 = game.addPlayer('3', 'testPlayer2');
  player1.ready = true;
  player3.ready = true;
  game.start();

  game.removePlayer('2');

  game.handlePlayerMove('1', 'left');
  game.handlePlayerMove('1', 'right');
  game.handlePlayerMove('1', 'drop');
  game.handlePlayerMove('1', 'rotate');
  game.handlePlayerMove('1', 'hardDrop');

  // player1.emit('updateGameState');
  // player1.emit('updateFirstLine');
  player1.emit('linesDeleted', { nbLines: 2 });
  player1.emit('gameOver');

  it('should return true', () => {
    expect(game.hasPlayer(player1.id)).toBe(true);
  });

  it('should return [player1]', () => {
    expect(game.getAllPlayers()).toStrictEqual([player1, player3]);
  });

  it('should return []', () => {
    expect(game.getAllOponents(player1.id)).toStrictEqual([player3]);
  });

  it('should return false', () => {
    expect(game.isEmpty()).toBe(false);
  });

  it('should return true', () => {
    expect(game.areAllPlayersReady()).toBe(true);
  });
});
