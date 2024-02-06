import { PrismaClient } from '@prisma/client';
import { Player } from '../prisma/models';

const prisma = new PrismaClient();

export const findPlayerWithEmail = async (email: string) => {
  const player = await prisma.player.findUnique({
    where: {
      email: email,
    },
  });
  return player;
};

export const createPlayer = async (playerInfo: Player) => {
  return await prisma.player.create({
    data: {
      ...playerInfo,
    },
  });
};
