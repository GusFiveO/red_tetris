import { Router } from 'express';
import {
  createPlayerScore,
  getPlayersScore,
} from '../services/playerScoreService';

export const playerScoreRouter = Router();

playerScoreRouter.get('/', async (req, res) => {
  const playersScore = await getPlayersScore();
  res.status(200).json(playersScore);
});

playerScoreRouter.post('/', async (req, res) => {
  try {
    const playerScoreInfo = req.body;
    const newPlayer = await createPlayerScore(playerScoreInfo);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create player score.' });
  }
});
