import { Router } from 'express';
import { validateAccessTokenMiddleware } from '../middleware/authMiddleware';

export const playerRouter = Router();

playerRouter.use('/', validateAccessTokenMiddleware);

playerRouter.get('/me', (req, res) => {
  const player = req.body.user;
  res.status(200).json({ data: player });
});
