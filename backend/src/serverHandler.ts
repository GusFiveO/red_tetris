import { Server, Socket } from 'socket.io';
import { Game } from './classes/Game';
import { Player } from './classes/Player';
import {
  onGameOver,
  onGameStarted,
  onGameStateUpdate,
  onGameWinner,
  onNextPieceUpdate,
  onSpectrumUpdate,
} from './GameHandler';
import { Games } from './server';
import { createPlayerScore } from './services/playerScoreService';

export const addPlayer = (io: Server, socket: Socket, games: Games) => {
  return (roomName: string, playerName: string) => {
    if (!games[roomName]) {
      console.log(`joinRoom: ${roomName}`);
      const newGame = new Game(socket.id, roomName);

      newGame.on('gameStarted', onGameStarted(io, roomName));

      newGame.on('gameOver', onGameOver(io, newGame));

      newGame.on('updateGameState', onGameStateUpdate(io));

      newGame.on('updateSpectrum', onSpectrumUpdate(io, roomName));

      newGame.on('updateNextPiece', onNextPieceUpdate(io));

      newGame.on('gameWinner', onGameWinner(io, socket, newGame, roomName));

      games[roomName] = newGame;
      socket.emit('owner');
    }

    const game = games[roomName];
    const newPlayer = new Player(socket.id, playerName, game.tetrominoSequence);
    if (game.isStarted()) {
      socket.emit(
        'gameAlreadyStarted',
        'The game has already started, you cannot join.'
      );
      return;
    }

    const allOponents = game.getAllOponents(socket.id).map((player) => {
      return { id: player.id, name: player.name, spectrum: [] };
    });
    socket.emit('currentPlayers', allOponents);

    game.addPlayer(newPlayer);

    if (newPlayer) {
      socket.to(roomName).emit('playerJoined', {
        id: newPlayer?.id,
        name: newPlayer?.name,
        spectrum: [],
      });
    }

    socket.join(roomName);
  };
};

export const onStartGame = (socket: Socket, games: Games) => {
  return (roomName: string) => {
    const game = games[roomName];

    if (game && game.ownerId === socket.id) {
      game.start();
      console.log(`Game ${roomName} started`);
    }
  };
};

export const onPlayAgain = (socket: Socket, games: Games) => {
  return (roomName: string) => {
    const game = games[roomName];
    if (!game || game.ownerId !== socket.id) {
      return;
    }
    for (let player of Object.values(game.players)) {
      player.reset(game.tetrominoSequence);
    }
    game.start();
  };
};

export const onPlayerReady = (io: Server, games: Games, socket: Socket) => {
  return (payload: { roomName: string; newState: boolean }) => {
    const { roomName, newState } = payload;
    if (!games[roomName]) {
      return;
    }
    const game = games[roomName];
    const player = game.players[socket.id];

    player.ready = newState;
    io.to(roomName).emit('playerReady', {
      playerId: socket.id,
      state: newState,
    });
    console.log('allplayer are ready ?:', game.areAllPlayersReady());
    if (game.areAllPlayersReady()) {
      game.start();
    }
  };
};

export const onPlayerMove = (socket: Socket, games: Games) => {
  return (moveData: { roomName: string; moveType: string }) => {
    const { roomName, moveType } = moveData;
    const game = games[roomName];

    if (game && game.isStarted()) {
      game.handlePlayerMove(socket.id, moveType);
    }
  };
};

export const onLeaveRoom = (io: Server, socket: Socket, games: Games) => {
  return () => {
    console.log(`Player leaved ${socket.id}`);
    for (const roomName in games) {
      const game = games[roomName];
      console.log('leaving while started');
      if (game.hasPlayer(socket.id)) {
        game.removePlayer(socket.id);
        socket.to(roomName).emit('playerLeaved', socket.id);
        if (game.isEmpty()) {
          delete games[roomName];
        } else {
          if (game.started == true) {
            const remainingPlayer = Object.values(game.players);
            if (remainingPlayer.length == 1) {
              const winner = remainingPlayer[0];
              winner.stopGameLoop();
              game.started = false;
              delete games[roomName];
              io.to(winner.id).emit('gameWin', { message: 'You win!' });
              io.sockets.sockets.get(winner.id)?.disconnect();
              createPlayerScore({ name: winner.name, score: winner.score });
            }
          }
          if (game.ownerId === socket.id) {
            const newOwner = Object.values(game.players)[0];
            game.ownerId = newOwner.id;
            io.to(newOwner.id).emit('owner');
          }
        }
        socket.disconnect();
        break;
      }
    }
  };
};
