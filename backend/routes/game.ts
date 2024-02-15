import express from 'express';
import path from 'path';
import GameService from '../services/gameService';
import gameService2 from '../services/gameService2';

export const gameRouter = express.Router();

const game = new GameService();
const game2 = new gameService2();

const publicPath = path.join(__dirname, '../services');

game.startGame();

setInterval(() => {
  game2.moveDown();
  game2.updateGame();
  console.log(game2.gameStatus());
  // console.log(game.actualTetriminoStatus());
}, 1000);

gameRouter.get('/', (req, res) => {
  const htmlFilePath = path.join(publicPath, 'index.html');
  res.sendFile(htmlFilePath);
});

gameRouter.get('/2', (req, res) => {
  let g = game2.gameLoop();
  // console.log(g);
  res.send(game2.gameLoop());
});
