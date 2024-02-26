import gameService from './gameService';

const game = new gameService();

game.startGame();
setInterval(() => {
  // console.log(`Longueur de la piece : ${game.piece.piece.length}`);
  game.printBoard();
  game.moveDown();
  game.moveRight();
  // game.piece.piece = game.piece.rotate(game.piece.piece);
}, 100);
