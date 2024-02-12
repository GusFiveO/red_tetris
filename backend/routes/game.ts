import express from 'express';
import path from 'path';
import GameService from '../services/gameService';

export const gameRouter = express.Router();

const game = new GameService();

const publicPath = path.join(__dirname, '../services');

game.startGame();

setInterval(() => {
  game.moveDown();
  // game.updateGame();
  // console.log(game.gameStatus());
  // console.log(game.actualTetriminoStatus());
}, 1000);

gameRouter.get('/', (req, res) => {
  const htmlFilePath = path.join(publicPath, 'index.html');
  res.sendFile(htmlFilePath);
});
