import { Server, Socket } from 'socket.io';
import { Game } from './classes/Game';
import {
  onFirstLineUpdate,
  onGameOver,
  onGameStarted,
  onGameStateUpdate,
  onGameWinner,
  onNextPieceUpdate,
} from './GameHandler';
import { Games } from './server';
import { createPlayerScore } from './services/playerScoreService';

export const addPlayer = (io: Server, socket: Socket, games: Games) => {
  return (roomName: string, playerName: string) => {
    if (!games[roomName]) {
      console.log(`joinRoom: ${roomName}`);
      const newGame = new Game(roomName);

      newGame.on('gameStarted', onGameStarted(io, roomName));

      newGame.on('gameOver', onGameOver(io));

      newGame.on('updateGameState', onGameStateUpdate(io));

      newGame.on('updateFirstLine', onFirstLineUpdate(io, roomName));

      newGame.on('updateNextPiece', onNextPieceUpdate(io));

      newGame.on('gameWinner', onGameWinner(io, socket, games, roomName));

      games[roomName] = newGame;
    }

    const game = games[roomName];
    if (game.isStarted()) {
      socket.emit(
        'gameAlreadyStarted',
        'The game has already started, you cannot join.'
      );
      return;
    }

    const allOponents = game.getAllOponents(socket.id).map((player) => {
      return { id: player.id, name: player.name, firstLine: 0 };
    });
    socket.emit('currentPlayers', allOponents);

    const newPlayer = game.addPlayer(socket.id, playerName);

    if (newPlayer) {
      socket.to(roomName).emit('playerJoined', {
        id: newPlayer?.id,
        name: newPlayer?.name,
        firstLine: 0,
      });
    }

    socket.join(roomName);
  };
};

export const onStartGame = (games: Games) => {
  return (roomName: string) => {
    const game = games[roomName];

    if (game) {
      game.start();
    }
    console.log(`Game ${roomName} started`);
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
      console.log('leaving while started');
      if (games[roomName].hasPlayer(socket.id)) {
        games[roomName].removePlayer(socket.id);
        socket.to(roomName).emit('playerLeaved', socket.id);
        if (games[roomName].isEmpty()) {
          delete games[roomName];
        } else if (games[roomName].started == true) {
          const remainingPlayer = Object.values(games[roomName].players);
          if (remainingPlayer.length == 1) {
            const winner = remainingPlayer[0];
            winner.stopGameLoop();
            games[roomName].started = false;
            delete games[roomName];
            io.to(winner.id).emit('gameWin', { message: 'You win!' });
            io.sockets.sockets.get(winner.id)?.disconnect();
            createPlayerScore({ name: winner.name, score: winner.score });
          }
        }
        socket.disconnect();
        break;
      }
    }
  };
};
