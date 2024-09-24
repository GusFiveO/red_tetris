import { Server, Socket } from 'socket.io';
import { Matrix } from './classes/utils';
import { Games } from './server';
import { createPlayerScore } from './services/playerScoreService';

interface Piece {
  matrix: Matrix;
  position: { x: number; y: number };
}

export const onGameStarted = (io: Server, roomName: string) => {
  return () => {
    io.to(roomName).emit('gameStarted');
  };
};

export const onGameOver = (io: Server) => {
  return (payload: {
    playerId: string;
    playerName: string;
    playerScore: number;
  }) => {
    const { playerId, playerName, playerScore } = payload;
    console.log('Game Over');
    io.to(playerId).emit('gameOver', { message: 'You lost!' });
    createPlayerScore({ name: playerName, score: playerScore });
  };
};

export const onGameStateUpdate = (io: Server) => {
  return (payload: {
    playerId: string;
    field: Matrix;
    score: number;
    piece: Piece;
  }) => {
    const { playerId, field, score, piece } = payload;
    io.to(playerId).emit('updateGameState', {
      field: field,
      score: score,
      piece: piece,
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

export const onGameWinner = (
  io: Server,
  socket: Socket,
  games: Games,
  roomName: string
) => {
  return (payload: {
    playerId: string;
    playerName: string;
    playerScore: number;
  }) => {
    const { playerId, playerName, playerScore } = payload;
    io.to(playerId).emit('gameWin', { message: 'You win!' });
    console.log('disconnect');
    socket.disconnect();
    delete games[roomName];
    createPlayerScore({ name: playerName, score: playerScore });
  };
};
