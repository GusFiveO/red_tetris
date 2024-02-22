import gameService from './gameService';

const game = new gameService();

setInterval(() => {
  game.printPiece();
  game.printBoard();
  game.moveDown();
  // game.piece.piece = game.piece.rotate(game.piece.piece);
}, 200);
