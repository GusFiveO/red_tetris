import { Server } from 'socket.io';
import { Matrix } from './classes/utils';
import { Games } from './server';
import { createPlayerScore } from './services/playerScoreService';

export const onGameStarted = (io: Server, roomName: string) => {
  return () => {
    io.to(roomName).emit('gameStarted');
  };
};

export const onGameOver = (io: Server) => {
  return (playerId: string) => {
    console.log('Game Over');
    io.to(playerId).emit('gameOver', { message: 'You lost!' });
  };
};

export const onGameStateUpdate = (io: Server) => {
  return (payload: { playerId: string; field: Matrix; score: number }) => {
    const { playerId, field, score } = payload;
    io.to(playerId).emit('updateGameState', {
      field: field,
      score: score,
    });
  };
};

export const onFirstLineUpdate = (io: Server, roomName: string) => {
  return (payload: { playerId: string; firstLine: number }) => {
    const { playerId, firstLine } = payload;
    io.to(roomName).except(playerId).emit('updateFirstLine', {
      playerId: playerId,
      firstLine: firstLine,
    });
  };
};

export const onGameWinner = (io: Server, games: Games, roomName: string) => {
  return (payload: {
    playerId: string;
    playerName: string;
    playerScore: number;
  }) => {
    const { playerId, playerName, playerScore } = payload;
    io.to(playerId).emit('gameWin', { message: 'You win!' });
    delete games[roomName];
    createPlayerScore({ name: playerName, score: playerScore });
  };
};
