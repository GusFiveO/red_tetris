import { Server, Socket } from 'socket.io';
import { Game } from './classes/Game';
import { Matrix } from './classes/utils';
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

export const onGameOver = (io: Server, game: Game) => {
  return (payload: {
    playerId: string;
    playerName: string;
    playerScore: number;
  }) => {
    const { playerId, playerName, playerScore } = payload;
    console.log('Game Over');
    io.to(playerId).emit('gameOver', { message: 'You lost!' });
    game.players[playerId].reset([...game.tetrominoSequence]);
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

export const onSpectrumUpdate = (io: Server, roomName: string) => {
  return (payload: { playerId: string; spectrum: number[] }) => {
    const { playerId, spectrum } = payload;
    io.to(roomName).except(playerId).emit('updateSpectrum', {
      playerId: playerId,
      spectrum: spectrum,
    });
  };
};

export const onNextPieceUpdate = (io: Server) => {
  return (payload: { playerId: string; nextPiece: Piece }) => {
    const { playerId, nextPiece } = payload;
    console.log(`${playerId} UPDATE NEXT PIECE ${nextPiece.matrix}`);
    io.to(playerId).emit('updateNextPiece', {
      nextPiece: nextPiece,
    });
  };
};

export const onGameWinner = (
  io: Server,
  socket: Socket,
  game: Game,
  roomName: string
) => {
  return (payload: {
    playerId: string;
    playerName: string;
    playerScore: number;
  }) => {
    const { playerId, playerName, playerScore } = payload;
    io.to(playerId).emit('gameWin', { message: 'You win!' });
    io.to(roomName).emit('gameEnded');
    game.players[playerId].reset([...game.tetrominoSequence]);
    createPlayerScore({ name: playerName, score: playerScore });
  };
};
