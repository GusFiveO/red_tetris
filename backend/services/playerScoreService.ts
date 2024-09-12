import { PrismaClient } from '@prisma/client';
import { PlayerScore } from '../prisma/models';

const prisma = new PrismaClient();

export const getPlayersScore = async () => {
  const playersScore = await prisma.playerScore.findMany();
  return playersScore;
};

export const createPlayerScore = async (playerScoreInfo: PlayerScore) => {
  return await prisma.playerScore.create({
    data: {
      ...playerScoreInfo,
    },
  });
};
